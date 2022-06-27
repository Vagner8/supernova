import jwt from "jsonwebtoken";
import { UserType } from "../../../common/src/userTypes";
import { MONGO_DB } from "../middleware/connectMongo";
import { CollectionName } from "../types";
import { accessError, serverError } from "./errors";
import { Response, NextFunction } from "express";
import { Collection } from "mongodb";
import { mongo } from "./mongo";

class Token {
  accessExpiresIn: number = 60 * 15;
  refreshExpiresIn: string = "1h";

  // accessExpiresIn: number = 3;
  // refreshExpiresIn: string = "5s";

  sign(name: "accessToken" | "refreshToken", adminId: string) {
    return name === "accessToken"
      ? jwt.sign({ adminId }, process.env.ACCESS_SECRET, {
          expiresIn: this.accessExpiresIn,
        })
      : jwt.sign({ adminId }, process.env.REFRESH_SECRET, {
          expiresIn: this.refreshExpiresIn,
        });
  }

  async findRefresh(adminId: string) {
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
    const result = await usersCollection.findOne<{ refreshToken: string }>(
      { userId: adminId },
      { projection: { _id: 0, refreshToken: 1 } }
    );
    if (!result) throw accessError({ message: "no token", logout: true });
    return result;
  }

  accessSetToCookie(accessToken: string, res: Response) {
    res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: this.accessExpiresIn * 1000,
    });
  }

  accessCheck({
    adminId,
    accessToken,
    res,
    next,
  }: {
    adminId: string | string[] | undefined;
    accessToken: string;
    res: Response;
    next: NextFunction;
  }) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err: any) => {
      if (err) {
        return await this.refreshCheck({ adminId, res, next });
      }
      return next();
    });
  }

  async refreshCheck({
    adminId,
    res,
    next,
  }: {
    adminId: string | string[] | undefined;
    res: Response;
    next: NextFunction;
  }) {
    if (typeof adminId !== 'string' ) {
      throw accessError({ message: "no admin id", logout: true });
    }
    const { refreshToken } = await this.findRefresh(adminId);
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err: any) => {
      if (err) {
        console.log("refreshToken", err);
        return next(err);
      }
      const newAccessToken = this.sign("accessToken", adminId);
      this.accessSetToCookie(newAccessToken, res);
      return next();
    });
  }

  async refreshSave(
    adminId: string,
    refreshToken: string,
    usersCollection: Collection<UserType>
  ) {
    const result = await usersCollection.updateOne(
      { userId: adminId },
      { $set: { refreshToken } }
    );
    if (!result.acknowledged) throw serverError("bad token update");
  }

  async saveCredentials({
    usersCollection,
    login,
    refreshToken,
    encryptedPassword,
    uniqueId,
  }: {
    usersCollection: Collection<UserType>;
    login: string;
    refreshToken: string;
    encryptedPassword: string;
    uniqueId: string;
  }) {
    const result = await usersCollection.updateOne(
      { "configs.login": login },
      {
        $set: {
          refreshToken,
          userId: uniqueId,
          "configs.password": encryptedPassword,
        },
      }
    );
    if (!result.acknowledged) throw serverError("bad credentials update");
  }
}

export const token = new Token();
