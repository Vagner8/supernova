export function isValueObject(value: any) {
  if (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
  ) return true
  return false
}