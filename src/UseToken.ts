import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import { Owner } from "./db/types";

export class UseToken {
  constructor(
    public res: Response,
    public collection?: Collection<Owner>
  ) {}

  createAccessToken(ownerId: string) {
    const accessToken = jwt.sign({ ownerId }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    this.res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 1000 * 15,
    });
  }

  async createRefreshToken(ownerId: string) {
    const refreshToken = jwt.sign({ ownerId }, process.env.REFRESH_SECRET, {
      expiresIn: "3d",
    });
    if (this.collection) {
      await this.collection.updateOne({ ownerId }, { $set: { refreshToken } });
    }
  }
}
