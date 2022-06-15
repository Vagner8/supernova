import { Response } from "express";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import { Owner } from "../../common/src/owner";

export class UseToken {
  constructor(
    public res: Response,
    public collection?: Collection<Owner>
  ) {}

  createAccessToken(ownerId: string) {
    const accessToken = jwt.sign({ ownerId }, process.env.ACCESS_SECRET, {
      expiresIn: "15m",
      // expiresIn: '3s'
    });
    this.res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 60 * 1000 * 15,
      // maxAge: 3000
    });
  }

  async createRefreshToken(ownerId: string) {
    const refreshToken = jwt.sign({ ownerId }, process.env.REFRESH_SECRET, {
      expiresIn: "1h",
      // expiresIn: '10s'
    });
    if (this.collection) {
      await this.collection.updateOne({ ownerId }, { $set: { refreshToken } });
    }
  }
}
