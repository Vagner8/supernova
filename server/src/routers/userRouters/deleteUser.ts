import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { deleteData } from "../controllers/deleteData";

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bodyOrId = (id: string, body: string[]) => {
    if (body.length > 0) return body
    return [id]
  }
  deleteData({
    cursor: bodyOrId(req.query.id as string, req.body as string[]),
    collectionName: CollectionName.Users,
    req,
    res,
    next,
  });
}
