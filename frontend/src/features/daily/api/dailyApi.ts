import { axiosClient } from '@/lib/axiosClient'
import { parseDate } from '@/lib/dateUtil'
import { Daily } from '../types'

export const dailyApi = () => {
  const axios = axiosClient()

  /**
   * 全件取得
   */
  const getAll = async (): Promise<Daily[]> => {
    const result = await axios.get<Daily[]>('api/Daily/GetAll')
    return result.data.map(
      (item): Daily => ({
        ...item,
        date: parseDate(item.date)
      })
    )
  }

  /**
   * 1件取得
   */
  const get = async (id: number): Promise<Daily> => {
    const result = await axios.get<Daily>(`api/Daily/Get?id=${id}`)
    return {
      ...result.data,
      date: parseDate(result.data.date)
    }
  }

  /**
   * 登録
   */
  const add = async (model: Daily): Promise<void> => {
    await axios.post('api/Daily/Add', model)
  }

  /**
   * 更新
   */
  const update = async (model: Daily): Promise<void> => {
    await axios.post('api/Daily/Update', model)
  }

  /**
   * 削除
   */
  const remove = async (model: Daily): Promise<void> => {
    await axios.post('api/Daily/Remove', model)
  }

  return {
    getAll,
    get,
    add,
    update,
    remove
  }
}
