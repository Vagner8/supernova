import { NextFunction, Request, Response } from "express";
import { token } from "../helpers/token";

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.headers.adminid;
      const accessToken = req.cookies.accessToken;
      if (accessToken)
        token.accessCheck({ adminId, accessToken, res, next });
      if (!accessToken) await token.refreshCheck({adminId, res, next});
    } catch (err) {
      next(err);
    }
  };
