import { normalizeDate } from '.'
import { DateLike } from '@@/types'

export default (date: DateLike, locale = 'en-US') =>
  normalizeDate(date).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
