import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { putData } from "../controllers/putData";

export async function putUser(req: Request, res: Response, next: NextFunction) {
  await putData({
    collectionName: CollectionName.Users,
    profile: req.body,
    filter: { itemId: req.query.itemId as string },
    res,
    next,
  });
}
