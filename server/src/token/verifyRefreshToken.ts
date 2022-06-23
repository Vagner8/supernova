import { NextFunction, Request, Response } from "express";
import { accessError, serverError } from "../helpers/customErrors";
import { createAccessToken } from "./createAccessToken";
import jwt from "jsonwebtoken";
import { UserType } from "../../../common/src/userTypes";
import { CollectionName } from "../types";
import { MONGO_DB } from "../middleware/connectMongo";

export const verifyRefreshToken = async (adminId: string, res: Response, next: NextFunction) => {
  const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users);
  if (!usersColl) throw serverError("bad connection");
  if (adminId === "idle" || !adminId || Array.isArray(adminId)) {
    throw accessError({ message: "no admin id", logout: true });
  }
  const result = await usersColl.findOne<{ refreshToken: string }>(
    { userId: adminId },
    { projection: { _id: 0, refreshToken: 1 } }
  );
  if (!result.refreshToken) throw serverError("no refresh token");
  jwt.verify(
    result.refreshToken,
    process.env.REFRESH_SECRET,
    (err: any) => {
      if (err) return next(err);
      createAccessToken(adminId, res);
    }
  );
}