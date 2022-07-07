import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserProfileType } from "../../../../common/src/userTypes";
import { v4 as uuidv4 } from "uuid";
import { putData } from "../controllers/putData";
import bcrypt from "bcryptjs";

export async function putUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  const profile = req.body as Partial<UserProfileType>
  if (id === 'new' && profile.credentials?.password) {
    profile.credentials.password = await bcrypt.hash(profile.credentials.password, 10)
  }
  await putData({
    collectionName: CollectionName.Users,
    profile: req.body as Partial<UserProfileType>,
    filter: {userId: id === 'new' ? uuidv4() : id },
    res,
    next,
  });
}
