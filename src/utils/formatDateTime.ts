import { normalizeDate } from '.'
import { DateLike } from '@@/types'

export default (date: DateLike, locale = 'en-US') =>
  normalizeDate(date).toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
