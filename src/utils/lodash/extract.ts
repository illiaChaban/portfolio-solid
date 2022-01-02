export const extractFloat = (
  num: string | undefined
): number | null => {
  const parsed = /[\d\.]+/.exec(num ?? '')
  return parsed && Number(parsed[0])
}