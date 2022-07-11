import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { putData } from "../controllers/putData";

export async function putProduct(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  const profile = req.body;
  if (id === "new") profile.created = new Date().toLocaleString();
  await putData({
    collectionName: CollectionName.Products,
    profile,
    filter: { itemId: id === "new" ? uuidv4() : id },
    res,
    next,
  });
}
