import { NextFunction, Response } from "express";
import { UserProfileType, UserType } from "../../../../common/src/userTypes";
import { CollectionName } from "../../types";
import { serverError } from "../../helpers/errors";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { db } from "../../app";

interface PutData {
  profile: Partial<UserProfileType>;
  collectionName: CollectionName;
  filter: {
    [index: string]: string
  }
  res: Response;
  next: NextFunction;
}

export async function putData({ profile, collectionName, filter, res, next }: PutData) {
  try {
    const usersCollection = db.collection<UserType>(collectionName);
    const result = await usersCollection.updateOne(
      filter,
      { $set: profile },
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
