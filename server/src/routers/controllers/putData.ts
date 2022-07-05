import { NextFunction, Response } from "express";
import { UserPointsType } from "../../../../common/src/userTypes";
import { mongo } from "../../helpers/mongo";
import { CollectionName } from "../../types";
import { serverError } from "../../helpers/errors";
import { OperationResultType } from "../../../../common/src/operationResultType";

interface PutData {
  points: Partial<UserPointsType>;
  collectionName: CollectionName;
  filter: {
    [index: string]: string
  }
  res: Response;
  next: NextFunction;
}

export async function putData({ points, collectionName, filter, res, next }: PutData) {
  try {
    const usersCollection = mongo.getCollection(collectionName);
    const result = await usersCollection.updateOne(
      filter,
      { $set: points },
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
