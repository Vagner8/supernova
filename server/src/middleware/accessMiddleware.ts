import { NextFunction, Request, Response } from "express";
import { accessError, serverError } from "../helpers/errors";
import { token } from "../helpers/token";

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.headers.adminid;
      const accessToken = req.cookies.accessToken;
      if (typeof adminId !== "string")
        throw accessError({ message: "no admin id", logout: true });
      if (accessToken)
        token.checkAccess({ adminId, accessToken, res, next });
      // if (!accessToken) await token.checkRefresh({adminId, res, next});
    } catch (err) {
      next(err);
    }
  };
