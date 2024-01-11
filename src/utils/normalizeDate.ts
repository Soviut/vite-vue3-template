import { Timestamp } from 'firebase/firestore'
import dayjs from 'dayjs'
import { DateLike } from '@@/types'

export default (date: DateLike): Date => {
  if (date instanceof Date) return date
  if (typeof date === 'number') return new Date(date)
  if (typeof date === 'string') return new Date(date)
  // firebase Timestamp detection
  if (date instanceof Timestamp) return date.toDate()
  // dayjs
  if (dayjs.isDayjs(date)) return date.toDate()
  if (typeof date === 'object' && date.seconds && date.nanoseconds)
    return new Timestamp(date.seconds, date.nanoseconds).toDate()
  throw new Error('Invalid date')
}
