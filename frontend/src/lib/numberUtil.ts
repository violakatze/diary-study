/**
 * 数値変換
 */
export const toNumber = (arg: unknown): number | undefined => {
  const num = Number(arg)
  if (Number.isNaN(num)) {
    return undefined
  }

  return num
}
