/**
 * 天気
 */
export const weather = {
  Sunny: 0,
  Cloudy: 1,
  Rainy: 2
} as const

export type Weather = (typeof weather)[keyof typeof weather]

export const isWeather = (v: any): v is Weather =>
  typeof v === 'number' && Object.values(weather).some(w => w === v)
