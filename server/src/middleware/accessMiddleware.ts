import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../types";
import jwt from "jsonwebtoken";
import { MONGO_DB } from "./connectMongo";
import { UserType } from "../../../common/src/userTypes";
import { accessError, serverError } from "./../helpers/customErrors";
import { createAccessToken } from "../token/createAccessToken";

export let ADMIN_ID: string;

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminId = req.headers.adminid;
      if (adminId === "idle" || !adminId || Array.isArray(adminId)) {
        throw accessError({message: "no admin id", logout: true});
      }

      const accessToken = req.cookies.accessToken;
      if (accessToken) {
        jwt.verify(
          accessToken,
          process.env.ACCESS_SECRET,
          (err: any, decoded: any) => {
            if (err) return
            ADMIN_ID = decoded.adminId;
          }
        );
      }

      if (!accessToken) {
        const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users);
        if (!usersColl) throw serverError("bad connection");
        const result = await usersColl.findOne<{ refreshToken: string }>(
          { userId: adminId },
          { projection: { _id: 0, refreshToken: 1 } }
        );
        if (!result.refreshToken) throw serverError("no refresh token");
        jwt.verify(
          result.refreshToken,
          process.env.REFRESH_SECRET,
          (err: any, decoded: any) => {
            if (err) return next(err);
            ADMIN_ID = decoded.adminid;
            createAccessToken(adminId, res);
          }
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
