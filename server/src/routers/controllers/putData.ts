import { NextFunction, Response } from "express";
import { UserProfileType, UserType } from "../../../../common/src/userTypes";
import { CollectionName } from "../../types";
import { serverError } from "../../helpers/errors";
import { OperationResultType } from "../../../../common/src/operationResultType";
import { db } from "../../app";
import { ProductProfileType } from "../../../../common/src/productTypes";

interface PutData {
  profile: Partial<UserProfileType> | Partial<ProductProfileType>;
  collectionName: CollectionName;
  filter: {
    [index: string]: string
  }
  res: Response;
  next: NextFunction;
}

export async function putData({ profile, collectionName, filter, res, next }: PutData) {
  try {
    const usersCollection = db.collection(collectionName);
    const result = await usersCollection.updateOne(
      filter,
      { $set: profile },
      { upsert: true }
    );
    if (!result.acknowledged) throw serverError("bad update");
    res.status(200).json({
      status: "success",
      message: "item updated",
    } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
