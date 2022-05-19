import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import { Owner } from "./db/types";

export class UseToken {
  constructor(
    public req: Request,
    public res: Response,
    public collection: Collection<Owner>
  ) {}

  createAccessToken(ownerId: string) {
    const accessToken = jwt.sign({ ownerId }, process.env.ACCESS_SECRET, {
      expiresIn: "10sec",
    });
    this.res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 10 * 1000,
    });
  }

  async createRefreshToken(ownerId: string) {
    const refreshToken = jwt.sign({ ownerId }, process.env.REFRESH_SECRET, {
      expiresIn: "60s",
    });
    await this.collection.updateOne({ ownerId }, { $set: { refreshToken } });
  }

  async checkAccessToken() {

  }

  async checkRefreshToken() {

  }

}
