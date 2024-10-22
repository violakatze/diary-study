import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { dailyApi } from '../api'

/**
 * 一覧フック
 */
export const useList = () => {
  const [message, setMessage] = useState<string | undefined>(undefined)
  const navigate = useNavigate()
  const { getAll } = dailyApi()

  const { data, isError, error } = useQuery({
    queryKey: [],
    queryFn: () => getAll()
  })

  if (isError) {
    setMessage(error.message)
  }

  const back = () => navigate('/')

  return {
    list: data,
    message,
    back
  }
}
