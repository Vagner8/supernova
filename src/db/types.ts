import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export interface Owner {
  _id: ObjectId;
  ownerId: string | undefined;
  password: string;
  refreshToken: string | undefined;

  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  zip: string;
  address: string; 
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