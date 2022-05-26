import { ObjectId } from "mongodb";

export interface Owner {
  _id: ObjectId;
  ownerId: string | undefined;
  login: string;
  password: string;
  refreshToken: string | undefined;

  personal: {
    name: string;
    surname: string;
    avatar: string;
  }
  contacts: {
    email: string;
    phone: string;
  }
  address: {
    city: string;
    zip: string;
    street: string;
    number: string; 
  }
}

export enum DataBase {
  SuperAdmin = "super-admin",
}

export enum CollName {
  Users = "users",
  Owners = "owners"
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
      GOOGLE_APPLICATION_CREDENTIALS: string;
    }
  }
}