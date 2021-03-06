export interface Owner {
  _id: string;
  ownerId: string;
  login: string;
  personal: Personal;
  contacts: Contacts;
  address: Address;
  imgUrls: ImgUrls
  password: string;
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

export interface OwnerPII {
  contacts: Contacts;
  address: Address;
  personal: Personal;
  imgUrls: ImgUrls
}


export type Projection<T> = {
  [Key in keyof T]?: T[Key] extends Object
    ? Projection<T[Key]> | 0 | 1
    : 1 | 0;
};