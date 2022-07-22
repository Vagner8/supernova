import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { getData } from "../controllers/getData";
import { newUser } from "../newItems/newUser";

export async function getUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { itemId, projection } = req.query as {
    itemId: string;
    projection: string;
  };

  getData({
    newItem: itemId === "new" ? newUser : null,
    match: itemId ? { itemId } : {},
    projection,
    collectionName: CollectionName.Users,
    res,
    next,
  });
}
