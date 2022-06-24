const arr = {
  a: 1,
  b: 2
}

const foo = () => {
  Object.keys(arr).forEach(() => {
    return true
  })

  return false
}

console.log(
  foo()
)