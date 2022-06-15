import { UserStatus, UserType } from '../../../../common/src/userTypes'

export const userInitialData: Omit<UserType, '_id'> = {
  userId: '',
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