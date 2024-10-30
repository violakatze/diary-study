export * from './Daily'

import { Daily } from './Daily'
import { weather } from '@/types'

/**
 * 入力画面モード
 */
export type Mode = 'create' | 'edit'

/**
 * 入力フォーム
 */
export type InputType = Daily

const getToday = (): Date => {
  const date = new Date()
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  return result
}

export const getDefaultValues = (): InputType => ({
  id: 0,
  date: getToday(), // JST0時固定
  content: '',
  weather: weather.Sunny
})
