import { UserType } from "../../../../common/src/userTypes";

export type NewUserType = Omit<UserType, "_id" | "refreshToken" | "userId" | 'timestamp'>

export const newUser: NewUserType = {
  settings: {
    rule: "New",
    timestamp: new Date()
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