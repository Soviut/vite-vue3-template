export default (
  cents: number,
  {
    precision = 2,
    fixed = true,
    currency = 'USD',
    locale = 'en-US',
  }: {
    precision?: number
    fixed?: boolean
    currency?: string
    locale?: string
  } = {}
) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: fixed ? precision : 0,
    maximumFractionDigits: precision,
  }).format(cents / 100)
}
