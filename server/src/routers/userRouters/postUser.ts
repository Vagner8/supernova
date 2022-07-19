import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { postData } from "../controllers/postData";

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await postData({
    collectionName: CollectionName.Users,
    profile: req.body,
    res,
    next,
  });
}
