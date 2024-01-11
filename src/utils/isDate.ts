export default (date: unknown): boolean => {
  if (!date) return false
  if (date instanceof Date) return true
  if (typeof date === 'number') return true
  if (typeof date === 'string') return true
  return false
}
