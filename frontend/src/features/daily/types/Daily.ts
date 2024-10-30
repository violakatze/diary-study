import * as yup from 'yup'
import { isValidDate } from '@/lib/dateUtil'
import { isWeather, Weather } from '@/types'

export const DailySchema = yup
  .object()
  .shape({
    id: yup.number().required(),
    date: yup.date().required('日付を入力してください').typeError('日付形式で入力してください'),
    content: yup.string().max(100, '100文字以内で入力してください'),
    weather: yup.mixed<Weather>().required()
  })
  .test((options, content) => {
    if (!isValidDate(options.date)) {
      return content.createError()
    }

    if (options.weather !== undefined && !isWeather(options.weather)) {
      return content.createError({ message: '有効な天気ではありません' })
    }

    return true
  })

export type Daily = yup.InferType<typeof DailySchema>
