import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";

export interface Owner {
  _id: ObjectId;
  name: string;
  password: string;
  ownerId: string | undefined;
  refreshToken: string | undefined;
}

export enum DataBase {
  SuperAdmin = "super-admin",
}

export enum CollName {
  Users = "users",
  Owners = "owners"
}

export interface ErrorMiddleware {
  (error: Error, req: Request, res: Response, next: NextFunction): void
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_USER: string;
      MONGO_PASSWORD: string;
      ACCESS_SECRET: string;
      REFRESH_SECRET: string;
    }
  }
}