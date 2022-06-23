import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { verifyRefreshToken } from "../token/verifyRefreshToken";


export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.headers.adminid as any;
      const accessToken = req.cookies.accessToken;
      if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err: any) => {
          if (err) await verifyRefreshToken(adminId, res, next)
          next();
        });
      }
      if (!accessToken) {
        await verifyRefreshToken(adminId, res, next)
        next();
      }
    } catch (err) {
      next(err);
    }
  };
