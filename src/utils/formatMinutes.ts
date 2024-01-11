// convert minutes to HH:MM string format
export default (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return (
    hours.toString().padStart(2, '0') + ':' + mins.toString().padStart(2, '0')
  )
}
