export default (
  value: number,
  {
    precision = 3,
    fixed = false,
    locale = 'en-US',
  }: {
    precision?: number
    fixed?: boolean
    locale?: string
  } = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: fixed ? precision : 0,
    maximumFractionDigits: precision,
  }).format(value)
}
