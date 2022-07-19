import { NextFunction, Response } from "express";
import { CollectionName } from "../../types";
import { serverError } from "../../helpers/errors";
import { db } from "../../app";
import { OperationResultType } from "../../../../common/src/commonTypes";
import { UserType } from "../../../../common/src/userTypes";
import { ProductType } from "../../../../common/src/productTypes";
import bcrypt from "bcryptjs";

interface PostData {
  profile: Omit<Partial<UserType>,"_id"> | Omit<Partial<ProductType>, "_id">;
  collectionName: CollectionName;
  res: Response;
  next: NextFunction;
}

export async function postData({
  profile,
  collectionName,
  res,
  next,
}: PostData) {
  try {
    if ('secret' in profile && profile.secret?.password) {
      profile.secret.password = await bcrypt.hash(profile.secret.password, 10);
    }
    const usersCollection = db.collection(collectionName);
    profile.created = Date.now().toString();
    const result = await usersCollection.insertOne(profile);
    if (!result.insertedId) throw serverError("bad creation");
    return res.status(201).json({
      status: "success",
      message: "new item created",
    } as OperationResultType);
  } catch (err) {
    next(err);
  }
}
