import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toNumber } from '@/lib/numberUtil'
import { useSnackbarContext } from '@/providers/SnackbarProvider'
import { dailyApi } from '../api'
import { Daily, DailySchema, getDefaultValues, Mode } from '../types'

/**
 * 入力画面フック
 */
export const useInput = () => {
  const param = useParams<{ id: string }>()
  const { get, add: apiAdd, update: apiUpdate, remove: apiRemove } = dailyApi()
  const id = toNumber(param.id)
  const mode: Mode = id === undefined ? 'create' : 'edit'
  const [message, setMessage] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const { setSnackbarMessage } = useSnackbarContext()

  const addMutetion = useMutation<void, Error, Daily, unknown>({ mutationFn: apiAdd })
  const updateMutation = useMutation<void, Error, Daily, unknown>({ mutationFn: apiUpdate })
  const removeMutation = useMutation<void, Error, Daily, unknown>({ mutationFn: apiRemove })

  const onSuccess = (snackbarMessage: string) => {
    setSnackbarMessage?.(snackbarMessage)
  }

  const defaultValues = getDefaultValues()

  /**
   * 1件取得する(idが無い場合は試行しない=新規登録時)
   */
  const {
    data: values,
    isError: isGetError,
    error
  } = useQuery({
    queryKey: [id],
    queryFn: async (): Promise<Daily | undefined> => {
      if (id === undefined) {
        return defaultValues
      }
      return get(id)
    }
  })

  const form = useForm<Daily>({ values, defaultValues, resolver: yupResolver(DailySchema) })

  if (isGetError) {
    setMessage(error.message)
  }

  /**
   * 登録
   */
  const add = async (model: Daily): Promise<void> => {
    await addMutetion.mutateAsync(model, {
      onSuccess: () => {
        onSuccess('登録しました')
        back()
      },
      onError: (error: Error) => setMessage(error.message)
    })
  }

  /**
   * 更新
   */
  const update = async (model: Daily): Promise<void> => {
    await updateMutation.mutateAsync(model, {
      onSuccess: () => {
        onSuccess('更新しました')
        back()
      },
      onError: (error: Error) => setMessage(error.message)
    })
  }

  /**
   * 削除
   */
  const remove = async (model: Daily): Promise<void> => {
    await removeMutation.mutateAsync(model, {
      onSuccess: () => {
        onSuccess('削除しました'), back()
      },
      onError: (error: Error) => setMessage(error.message)
    })
  }

  /**
   * 戻る
   */
  const back = () => {
    if (mode === 'create') {
      navigate('/')
      return
    }

    navigate('..')
  }

  return {
    form,
    mode,
    isGetError,
    add,
    update,
    remove,
    message,
    back
  }
}
