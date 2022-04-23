import { Request } from "express";

interface Personal {
  userId: string;
  name: string;
  surname: string;
  birth: string;
}

interface Address {
  userId: string;
  city: string;
  zip: string;
  street: string;
  numberHouse: string;
}

interface Contact {
  userId: string;
  phone: string;
  email: string;
}

interface Settings {
  userId: string;
  registration: string;
  role: string;
  selected: boolean;
  disabled: boolean;
}

interface Security {
  userId: string;
  password: string;
}

export enum DataBase {
  Users = "users",
}

export enum UsersCollections {
  Personal = "personal",
  Settings = "settings",
  Contact = "contact",
  Address = "address",
  Security = "security",
}

export interface User {
  [UsersCollections.Address]: Address;
  [UsersCollections.Contact]: Contact;
  [UsersCollections.Personal]: Personal;
  [UsersCollections.Settings]: Settings;
  [UsersCollections.Security]: Security;
}

export interface ProfileRequest extends Request {
  query: {
    userId: string;
  };
}

export interface LookupQuery {
  $lookup: {
    from: UsersCollections;
    localField: "id";
    foreignField: "id";
    as: UsersCollections;
  };
}