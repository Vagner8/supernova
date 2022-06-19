import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { MONGO_DB } from "../../middleware/connectMongo";
import { UserType } from "../../../../common/src/userTypes"
import { USER_ID } from "./../../middleware/accessMiddleware";
import { validateError, serverError } from "../../helpers/customErrors";

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {projection, userId} = req.query as {projection: undefined | string, userId: string};
    if (!projection) throw validateError(null, 'bad projection')
    const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users)
    if (!usersColl) throw serverError("bad connection")
    const user = await usersColl.findOne(
      { userId: USER_ID || userId },
      { projection: JSON.parse(projection) }
    )
    if (!user) throw serverError("no user")
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
