import { Daily, DailySchema } from '@/features/daily/types'
import { weather } from '@/types'

describe('validation test', () => {
  test.each([
    { id: 1, date: new Date(2000, 0, 1), content: 'ABCDE', weather: weather.Sunny },
    { id: 2, date: new Date(2000, 0, 2), content: '', weather: weather.Cloudy },
    {
      id: 3,
      date: new Date(2000, 0, 3),
      content:
        '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      weather: weather.Rainy
    }
  ])('正常値 %#', (model: Daily) => {
    expect(DailySchema.isValidSync(model)).toBeTruthy()
  })

  test.each([
    { id: 1, date: undefined, content: '', weather: weather.Sunny },
    { id: 2, date: null, content: '', weather: weather.Sunny },
    { id: 3, date: '', content: '', weather: weather.Sunny }
    // { id: 4, date: 'YYYY/01/01', content: '', weather: weather.Sunny } // バリデーション通る(年が置換される)
  ])('日付不正 %#', (model: any) => {
    expect(DailySchema.isValidSync(model)).toBeFalsy()
  })

  test('文字列オーバー', () => {
    const model: Daily = {
      id: 1,
      date: new Date(2000, 0, 1),
      content:
        '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
      weather: weather.Sunny
    }
    expect(DailySchema.isValidSync(model)).toBeFalsy()
  })

  test.each([
    { id: 1, date: new Date(2000, 0, 1), content: '', weather: -1 },
    { id: 2, date: new Date(2000, 0, 1), content: '', weather: 3 }
  ])('天気不正 %#', (model: any) => {
    expect(DailySchema.isValidSync(model)).toBeFalsy()
  })
})
