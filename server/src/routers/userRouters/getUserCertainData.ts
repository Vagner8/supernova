import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { getCertainData } from "../controllers/getCertainData";
import { newUser } from "./getUserById";

export async function getUserCertainData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, projection } = req.query as {
    userId: string;
    projection: string;
  };
  getCertainData({
    newItem: userId === "new" ? newUser : null,
    match: userId ? { userId } : {},
    projection,
    collectionName: CollectionName.Users,
    res,
    next,
  });
}
