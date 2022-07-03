import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserPointsType, UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { mongo } from "../../helpers/mongo";
import { v4 as uuidv4 } from "uuid";

export async function putUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.query as { id: string };
    const userPoints = req.body as Partial<UserPointsType>;
    const userId = id === "new" ? uuidv4() : id;
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
    const result = await usersCollection.updateOne(
      { userId },
      { $set: userPoints },
      { upsert: true }
    );
    if (!result.acknowledged) throw serverError("bad update");
    res.status(200).json({
      status: "success",
      message: "user updated",
    } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
