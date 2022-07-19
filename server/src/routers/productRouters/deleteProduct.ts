import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { deleteData } from "../controllers/deleteData";

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bodyOrId = (itemId: string, body: string[]) => {
    if (body.length > 0) return body
    return [itemId]
  }
  deleteData({
    cursor: bodyOrId(req.query.itemId as string, req.body as string[]),
    collectionName: CollectionName.Products,
    req,
    res,
    next,
  });
}
