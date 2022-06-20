import { Response } from "express";
import jwt from "jsonwebtoken";

export function createAccessToken(adminId: string, res: Response) {
  const expiresIn = 60 * 15
  const accessToken = jwt.sign({ adminId }, process.env.ACCESS_SECRET, {
    expiresIn
  });
  res.cookie("accessToken", accessToken, {
    sameSite: "lax",
    httpOnly: true,
    maxAge: expiresIn * 1000,
  });
}
