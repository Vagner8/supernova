import { NextFunction, Request, Response } from "express";
import { MONGO_DB } from "../../middleware/connectMongo";
import { CollectionName } from "../../types";
import { UserPointsType, UserType } from "../../../../common/src/userTypes";
import { USER_ID } from "../../middleware/accessMiddleware";
import { serverError } from "../../helpers/customErrors";

export async function putUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ownersColl = MONGO_DB.collection<UserType>(CollectionName.Users)
    const ownerPII = req.body as Partial<UserPointsType>
    if (!ownersColl) throw serverError("bad connection")
    const result = await ownersColl.updateOne(
      {userId: USER_ID},
      {$set: ownerPII}
    )
    if (!result.acknowledged) throw serverError("bad update")
    res.status(200).json(result)
  } catch (err) {
    next(err);
  }
}
