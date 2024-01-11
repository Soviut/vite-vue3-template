import { normalizeDate } from '.'
import { DateLike } from '@@/types'

const pad = (num: number, digits = 2, padding = '0') =>
  num.toString().padStart(digits, padding)

export default (date: DateLike) => {
  const norm = normalizeDate(date)
  const year = norm.getUTCFullYear()
  const month = pad(norm.getUTCMonth() + 1)
  const day = pad(norm.getUTCDate())
  const hour = pad(norm.getUTCHours())
  const minute = pad(norm.getUTCMinutes())
  const second = pad(norm.getUTCSeconds())
  const isUTC = norm.getTimezoneOffset() === 0
  return `${year}${month}${day}T${hour}${minute}${second}${isUTC ? 'Z' : ''}`
}
