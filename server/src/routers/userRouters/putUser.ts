import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserPointsType } from "../../../../common/src/userTypes";
import { v4 as uuidv4 } from "uuid";
import { putData } from "../controllers/putData";

export async function putUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.query as { id: string };
  putData({
    collectionName: CollectionName.Users,
    points: req.body as Partial<UserPointsType>,
    filter: {userId: id === 'new' ? uuidv4() : id },
    res,
    next,
  });
}
