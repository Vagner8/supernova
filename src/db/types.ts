import { NextFunction, Request, Response } from "express";

export enum DataBase {
  SuperAdmin = "super-admin",
}

export enum Collections {
  Users = "users",
  Owners = "owners"
}

export interface ErrorMiddleware {
  (error: Error, req: Request, res: Response, next: NextFunction): void
}

export interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
}