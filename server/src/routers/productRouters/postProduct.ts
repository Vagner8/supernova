import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { postData } from "../controllers/postData";

export async function postProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await postData({
    collectionName: CollectionName.Products,
    profile: req.body,
    res,
    next,
  });
}
