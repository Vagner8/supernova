export const newUser: Omit<UserType, '_id'> = {
  userId: 'new',
  login: '',
  password: '',
  rule: UserStatus.New,

  personal: {
    name: '',
    surname: '',
  },
  contacts: {
    email: '',
    phone: '',
  },
  address: {
    city: '',
    zip: '',
    street: '',
    number: '',
  },
  imgUrls: {
    avatar: [],
    photos: []
  }
}