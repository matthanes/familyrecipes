const minutesToHours = (time: number): string => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60
  const hoursLabel = hours === 1 ? 'hr' : 'hrs'
  const minutesLabel = minutes === 1 ? 'min' : 'mins'

  if (hours === 0) return `${minutes} ${minutesLabel}`
  if (minutes === 0) return `${hours} ${hoursLabel}`
  return `${hours} ${hoursLabel} ${minutes} ${minutesLabel}`
}

export default minutesToHours
