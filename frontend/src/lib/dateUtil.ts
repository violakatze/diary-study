import { isDate, isValid } from 'date-fns'

/**
 * APIのDate型(jsonで降ってくるので文字列)をjsのDate型に変換
 * @param arg API側Date(文字列)
 * @returns 変換後オブジェクト(T型)
 */
export const parseDate = <T extends Date | Date[] | undefined>(arg: T) => {
  if (arg === undefined) {
    return undefined as T
  }

  if (Array.isArray(arg)) {
    return arg.map(a => new Date(a)) as T
  }

  return new Date(arg) as T
}

/**
 * Date型判定
 */
export const isValidDate = (arg: unknown): arg is Date => {
  if (arg !== null && arg !== undefined && isDate(arg) && isValid(arg)) {
    return true
  }
  return false
}
