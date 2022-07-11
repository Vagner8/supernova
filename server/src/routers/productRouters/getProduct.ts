import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { getData } from "../controllers/getData";
import { newProduct } from "../newItems/newProduct";

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { itemId, projection } = req.query as {
    itemId: string;
    projection: string;
  };
  getData({
    newItem: itemId === "new" ? newProduct : null,
    match: itemId ? { itemId } : {},
    projection,
    collectionName: CollectionName.Products,
    res,
    next,
  });
}