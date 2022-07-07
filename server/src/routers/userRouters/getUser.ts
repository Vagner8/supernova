import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { getData } from "../controllers/getData";
import { newUser } from "../newItems/newUser";

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId, projection } = req.query as {
    userId: string;
    projection: string;
  };
  getData({
    newItem: userId === "new" ? newUser : null,
    match: userId ? { userId } : {},
    projection,
    collectionName: CollectionName.Users,
    res,
    next,
  });
}
