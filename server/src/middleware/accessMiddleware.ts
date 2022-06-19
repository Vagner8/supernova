import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../types";
import jwt from "jsonwebtoken";
import { MONGO_DB } from "./connectMongo";
import { UserType } from "../../../common/src/userTypes";
import { accessError, serverError } from "./../helpers/customErrors";
import { createAccessToken } from "../token/createAccessToken";

export let USER_ID: string;

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.headers.userid;
      if (userId === "idle" || !userId || Array.isArray(userId)) {
        throw accessError({message: "no userId", logout: true});
      }
      const accessToken = req.cookies.accessToken;
      if (accessToken) {
        jwt.verify(
          accessToken,
          process.env.ACCESS_SECRET,
          (err: any, decoded: any) => {
            if (err) return
            USER_ID = decoded.userId;
          }
        );
      }

      if (!accessToken) {
        const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users);
        if (!usersColl) throw serverError("bad connection");
        const result = await usersColl.findOne<{ refreshToken: string }>(
          { userId },
          { projection: { _id: 0, refreshToken: 1 } }
        );
        if (!result) throw serverError("no refreshToken");
        jwt.verify(
          result.refreshToken,
          process.env.REFRESH_SECRET,
          (err: any, decoded: any) => {
            if (err) return next(err);
            USER_ID = decoded.userId;
            createAccessToken(userId, res);
          }
        );
      }
      next();
    } catch (err) {
      next(err);
    }
  };
