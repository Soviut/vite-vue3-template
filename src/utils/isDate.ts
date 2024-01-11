import { Timestamp } from 'firebase/firestore'

export default (date: unknown): boolean => {
  if (!date) return false
  if (date instanceof Date) return true
  if (typeof date === 'number') return true
  if (typeof date === 'string') return true
  // firebase Timestamp detection
  if (date instanceof Timestamp) return true
  if (typeof date === 'object' && 'seconds' in date && 'nanoseconds' in date)
    return true
  return false
}
