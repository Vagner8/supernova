import { User, UsersCollections } from "../usersTypes";

export const newUser: User = {
  [UsersCollections.Personal]: {
    userId: "new",
    name: "Arnold",
    surname: "Schwarzenegger",
    birth: "1983-10-9T22:00:00.000Z",
  },
  [UsersCollections.Address]: {
    userId: "new",
    city: "Karlovy Vary",
    zip: "36005",
    street: "U Koupaliste",
    numberHouse: "2",
  },
  [UsersCollections.Contact]: {
    userId: 'new',
    phone: "+420776544634",
    email: "email@email.com",
  },
  [UsersCollections.Settings]: {
    userId: "new",
    registration: "2022-4-10T10:37:00.000Z",
    role: "user",
    selected: false,
    disabled: false,
  },
  [UsersCollections.Security]: {
    userId: 'new',
    password: ''
  }
}