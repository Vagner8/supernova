import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { putData } from "../controllers/putData";
import { ProductProfileType } from "../../../../common/src/productTypes";

export async function putProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  const profile = req.body as ProductProfileType;
  if (id === "new") profile.created = new Date().toLocaleString();
  await putData({
    collectionName: CollectionName.Products,
    profile,
    filter: { userId: id === "new" ? uuidv4() : id },
    res,
    next,
  });
}
