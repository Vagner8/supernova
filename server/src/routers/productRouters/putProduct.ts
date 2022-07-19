import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { putData } from "../controllers/putData";

export async function putProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await putData({
    collectionName: CollectionName.Products,
    profile: req.body,
    filter: { itemId: req.query.itemId as string },
    res,
    next,
  });
}
