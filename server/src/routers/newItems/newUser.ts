import { UserType } from "../../../../common/src/userTypes";

export type NewUserType = Omit<UserType, "_id" | "refreshToken" | 'timestamp' | 'created'>

export const newUser: NewUserType = {
  itemId: '',
  settings: {
    rule: "New",
  },
  personal: {
    name: "",
    surname: "",
  },
  contacts: {
    email: "",
    phone: "",
  },
  address: {
    city: "",
    zip: "",
    street: "",
    number: "",
  },
  imgs: {
    avatar: [],
    photos: [],
  },
  secret: {
    login: "",
    password: "",
  }
};