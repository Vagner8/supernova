import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { putData } from "../controllers/putData";
import bcrypt from "bcryptjs";

export async function putUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  const profile = req.body
  if (id === "new") {
    profile.secret.password = await bcrypt.hash(profile.secret.password, 10);
    profile.created = new Date().toLocaleString();
  }
  await putData({
    collectionName: CollectionName.Users,
    profile,
    filter: { userId: id === "new" ? uuidv4() : id },
    res,
    next,
  });
}
