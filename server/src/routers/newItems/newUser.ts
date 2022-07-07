import { UserType } from "../../../../common/src/userTypes";

export type NewUserType = Omit<UserType, "_id" | "refreshToken" | "userId" | 'timestamp'>

export const newUser: NewUserType = {
  credentials: {
    login: "",
    password: "",
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
};