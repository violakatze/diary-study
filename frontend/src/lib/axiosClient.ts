import axios, { AxiosError, AxiosResponse } from 'axios'

/**
 * Axios
 */
export const axiosClient = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-type': 'Application/json',
      Accept: 'Application/json'
    }
  })

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const { response } = error
      if (
        response !== undefined &&
        response.status === 400 &&
        response.data !== undefined &&
        isString(response.data)
      ) {
        const errorMessage = errorRecord[response.data]
        if (errorMessage !== undefined) {
          return Promise.reject(new Error(errorMessage))
        }
      }

      const result: Error = error
      return Promise.reject(result)
    }
  )

  return axiosInstance
}

const isString = (arg: unknown): arg is string => typeof arg === 'string'

const errorRecord: Record<string, string> = {
  Unexpected: '不明なエラーが発生しました。',
  SaveChanges: '保存時にエラーが発生しました。',
  DataNotFound: 'データがありません。',
  DateDuplicate: 'すでに登録済みの日付です。'
}
