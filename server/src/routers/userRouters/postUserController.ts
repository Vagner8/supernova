import { NextFunction, Request, Response } from "express";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/customErrors";
import { MONGO_DB } from "../../middleware/connectMongo";
import { CollectionName } from "../../types";

export async function postUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = req.body as UserType;
    const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users);
    if (!usersColl) throw serverError("bad connection");
    const result = await usersColl.insertOne(newUser);
    if (!result.insertedId) throw serverError("bad creation");
    res
      .status(200)
      .json({
        status: "success",
        message: `user ${newUser.configs.login} created`,
      } as OperationResultType);
    usersColl.deleteOne({_id: result.insertedId})
  } catch (err) {
    next(err);
  }
}
