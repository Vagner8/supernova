import jwt from "jsonwebtoken";
import { UserType } from "../../../common/src/userTypes";
import { CollectionName } from "../types";
import { accessError, serverError } from "./errors";
import { Response, NextFunction } from "express";
import { Collection } from "mongodb";
import { db } from "../app";

interface FindRefresh {
  adminId: string;
  next: NextFunction;
}

interface AccessCheck {
  adminId: string | string[] | undefined;
  accessToken: string;
  res: Response;
  next: NextFunction;
}

interface RefreshCheck {
  adminId: string | string[] | undefined;
  res: Response;
  next: NextFunction;
}

interface RefreshSave {
  adminId: string;
  refreshToken: string;
  usersCollection: Collection<UserType>;
  next: NextFunction;
}

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

  async findRefresh({ adminId, next }: FindRefresh) {
    try {
      const usersCollection = db.collection<UserType>(CollectionName.Users);
      const result = await usersCollection.findOne<{ refreshToken: string }>(
        { userId: adminId },
        { projection: { _id: 0, refreshToken: 1 } }
      );
      if (!result) throw accessError({ message: "no token", logout: true });
      return result.refreshToken;
    } catch (err) {
      next(err);
    }
  }

  accessSetToCookie(accessToken: string, res: Response) {
    res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: this.accessExpiresIn * 1000,
    });
  }

  accessCheck({ adminId, accessToken, res, next }: AccessCheck) {
    jwt.verify(accessToken, process.env.ACCESS_SECRET, async (err: any) => {
      if (err) return await this.refreshCheck({ adminId, res, next });
      return next();
    });
  }

  async refreshCheck({ adminId, res, next }: RefreshCheck) {
    try {
      if (typeof adminId !== "string")
        throw accessError({ message: "no admin id", logout: true });
      const refreshToken = await this.findRefresh({ adminId, next });
      if (!refreshToken)
        throw accessError({ message: "no refresh token", logout: true });
      jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,
        async (err: any) => {
          if (err) return next(err);
          const newAccessToken = this.sign("accessToken", adminId);
          this.accessSetToCookie(newAccessToken, res);
          return next();
        }
      );
    } catch (err) {
      next(err);
    }
  }

  async refreshSave({
    adminId,
    refreshToken,
    usersCollection,
    next,
  }: RefreshSave) {
    try {
      const result = await usersCollection.updateOne(
        { userId: adminId },
        { $set: { refreshToken } }
      );
      if (!result.acknowledged) throw serverError("bad token update");
    } catch (err) {
      next(err);
    }
  }
}

export const token = new Token();
