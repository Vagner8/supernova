import { NextFunction, Request, Response } from "express";
import { MONGO_DB } from "../../middleware/connectMongo";
import { CollectionName } from "../../types";
import { UserPointsType, UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { mongo } from "../../helpers/mongo";

export async function putUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query as { userId: string };
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users)
    const ownerPII = req.body as Partial<UserPointsType>;
    const result = await usersCollection.updateOne({ userId }, { $set: ownerPII });
    if (!result.acknowledged) throw serverError("bad update");
    res
      .status(200)
      .json({
        status: "success",
        message: 'user updated',
      } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
