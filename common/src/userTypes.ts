import { ImgsType } from "./commonTypes";

export enum UserStatus {
  Owner = 'Owner',
  Admin = "Admin",
  User = "User",
  Viewer = "Viewer",
  fired = "fired",
  New = "New",
}

export interface UserConfigsType {
  login: string;
  password: string;
  rule: UserStatus;
}

export interface UserPersonalType {
  name: string;
  surname: string;
}

export interface UserContactsType {
  email: string;
  phone: string;
}

export interface UserAddressType {
  city: string;
  zip: string;
  street: string;
  number: string;
}

export interface UserImgsType extends ImgsType {}

export interface UserType {
  _id: Object;
  userId: string;
  refreshToken: string;

  configs: UserConfigsType;
  personal: UserPersonalType;
  contacts: UserContactsType;
  address: UserAddressType;
  imgs: UserImgsType;
}

export type UserPointsType = Pick<
  UserType,
  "personal" | "contacts" | "address" | "imgs" | "configs"
>;
