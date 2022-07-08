import { ImgsType } from "./commonTypes";

export type UserStatus =
  | "Owner"
  | "Admin"
  | "User"
  | "Viewer"
  | "Fired"
  | "New"
  | "developer";

export interface UserSecretType {
  login: string;
  password: string;
}

export interface UserSettingsType {
  rule: UserStatus;
  timestamp: Date;
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
  selected?: boolean;

  secret: UserSecretType;
  settings: UserSettingsType;
  personal: UserPersonalType;
  contacts: UserContactsType;
  address: UserAddressType;
  imgs: UserImgsType;
}

export type UserProfileType = Pick<
  UserType,
  | "personal"
  | "contacts"
  | "address"
  | "imgs"
  | "settings"
  | "secret"
>;

export type UserProfileKeys = keyof UserProfileType;

export type ValidatedFields = UserSecretType &
  UserSettingsType &
  UserPersonalType &
  UserContactsType &
  UserAddressType;

export type ValidatedFieldsKeys = keyof ValidatedFields;

export type UserRequiredFields = [
  "login",
  "password",
  "email",
  "name",
  "surname",
  "phone"
];
