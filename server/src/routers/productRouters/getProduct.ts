import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { getData } from "../controllers/getData";
import { newProduct } from "../newItems/newProduct";

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { productId, projection } = req.query as {
    productId: string;
    projection: string;
  };
  getData({
    newItem: productId === "new" ? newProduct : null,
    match: productId ? { productId } : {},
    projection,
    collectionName: CollectionName.Products,
    res,
    next,
  });
}