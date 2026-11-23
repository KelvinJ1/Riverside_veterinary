export function formatClock(value: string) {
  const [hourPart, minutePart] = value.split(':')
  const hour = Number(hourPart)
  const minute = Number(minutePart)
  if (Number.isNaN(hour) || Number.isNaN(minute)) return value
  const suffix = hour >= 12 ? 'p.m.' : 'a.m.'
  const twelve = hour % 12 || 12
  const minutes = minute === 0 ? '' : `:${String(minute).padStart(2, '0')}`
  return `${twelve}${minutes} ${suffix}`
}
