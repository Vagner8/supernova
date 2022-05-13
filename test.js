const inputs = [
  {
    label: 'name',
    type: 'text',
    value: 'f',
    error: false,
    helperText: ' ',
  },
  {
    label: 'password',
    type: 'password',
    value: 'f',
    error: false,
    helperText: ' ',
  },
]


let a = inputs.reduce((acc, input) => {
  acc[input.label] = input.value
  return acc
}, {})

console.log(a)