import { NextFunction } from "express";
import { UserType } from "../../../../common/src/userTypes";
import { db } from "../../app";
import { CollectionName } from "../../types";

interface DeleteData {
  collectionName: CollectionName;
  next: NextFunction;
}

export function deleteData({ collectionName, next }: DeleteData) {
  try {
    const usersCollection = db.collection<UserType>(collectionName);
  } catch (err) {
    next(err);
  }
}
