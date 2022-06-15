export type Projection<T> = {
  [Key in keyof T]?: T[Key] extends Object
    ? Projection<T[Key]> | 0 | 1
    : 1 | 0;
};

export interface PointsType {
  personal: PersonalType;
  contacts: ContactsType;
  address: AddressType;
  imgUrls: ImgUrlsType
}

export interface PersonalType {
  name: string;
  surname: string;
}

export interface ContactsType {
  email: string;
  phone: string;
}

export interface AddressType {
  city: string;
  zip: string;
  street: string;
  number: string;
}

export interface ImgUrlsType {
  avatar: string[],
  photos: string[]
}