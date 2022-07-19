import { NextFunction, Response } from "express";
import { CollectionName } from "../../types";
import { serverError } from "../../helpers/errors";
import { db } from "../../app";
import { OperationResultType } from "../../../../common/src/commonTypes";
import { UserType } from "../../../../common/src/userTypes";
import { ProductType } from "../../../../common/src/productTypes";
import { v4 as uuidv4 } from "uuid";

interface PutData {
  profile: Omit<Partial<UserType | ProductType>, "_id">;
  collectionName: CollectionName;
  filter: {
    [index: string]: string;
  };
  res: Response;
  next: NextFunction;
}

export async function putData({
  profile,
  collectionName,
  filter,
  res,
  next,
}: PutData) {
  try {
    const usersCollection = db.collection(collectionName);
    const result = await usersCollection.updateOne(filter, [{ $set: profile }]);
    if (!result.matchedCount) throw serverError("bad filter");
    if (!result.modifiedCount) throw serverError("bad update");
    res.status(200).json({
      status: "success",
      message: "item updated",
    } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
