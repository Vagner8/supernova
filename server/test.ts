const projection = {
  userId: '$userId',
  name: '$personal.name',
  surname: '$personal.surname',
  email: '$contacts.email',
  phone: '$contacts.phone',
  rule: '$credentials.rule',
  avatar: '$imgs.avatar',
};


const foo = (obj: typeof projection) => {
  let newObj = {...obj}
  Object.entries(newObj).forEach(([key, value]) => {
    const splitValue = value.split('.')[0].slice(1)
    if (newObj[key as keyof typeof newObj]) {
      newObj[key] = splitValue
    }
  })
  return newObj
}

console.log(
  foo(projection)
)