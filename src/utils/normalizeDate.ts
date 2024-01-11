import dayjs from 'dayjs'
import { DateLike } from '@@/types'

export default (date: DateLike): Date => {
  if (date instanceof Date) return date
  if (typeof date === 'number') return new Date(date)
  if (typeof date === 'string') return new Date(date)
  // dayjs
  if (dayjs.isDayjs(date)) return date.toDate()
  throw new Error('Invalid date')
}
