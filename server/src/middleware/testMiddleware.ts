import { NextFunction, Request, Response } from "express";
import { mongoDb } from "../app";

export const testMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    // await mongoDb()
    next()
  };
