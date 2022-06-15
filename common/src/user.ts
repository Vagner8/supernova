export enum UserStatus {
  Admin = 'Admin',
  User = 'User',
  Viewer = 'Viewer',
  fired = 'fired',
}

export interface Personal {
  name: string;
  surname: string;
}

export interface Contacts {
  email: string;
  phone: string;
}

export interface Address {
  city: string;
  zip: string;
  street: string;
  number: string;
}

export interface ImgUrls {
  avatar: string[],
  photos: string[]
}

export type UserPII = Pick<User, 'personal' | 'contacts' | 'address' | 'imgUrls'>

export interface User {
  _id: string;
  userId: string;
  login: string;
  rule: UserStatus
  password: string;
  personal: Personal;
  contacts: Contacts;
  address: Address;
  imgUrls: ImgUrls;
}