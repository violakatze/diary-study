import { Weather } from '@/types'

export type Daily = {
  id: number
  date: Date
  content: string
  weather: Weather
}
