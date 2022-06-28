import { NextFunction, Request, Response } from "express";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { mongo } from "../../helpers/mongo";
import { CollectionName } from "../../types";

export async function postUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newUser = req.body as UserType;
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users)
    const result = await usersCollection.insertOne(newUser);
    if (!result.insertedId) throw serverError("bad user creation");
    res
      .status(200)
      .json({
        status: "success",
        message: `user ${newUser.credentials.login} created`,
      } as OperationResultType);
      usersCollection.deleteOne({_id: result.insertedId})
  } catch (err) {
    next(err);
  }
}
