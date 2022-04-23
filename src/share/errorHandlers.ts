export function throwError(where: string, what?: string): never {
  throw new Error(`in ${where}, caused by ${what}`)
}