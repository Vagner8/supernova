import { NextFunction, Response } from "express";
import { db } from "../../app";
import { serverError } from "../../helpers/errors";
import { CollectionName } from "../../types";
import { NewProductType } from "../newItems/newProduct";
import { NewUserType } from "../newItems/newUser";
import { v4 as uuidv4 } from "uuid";

interface GetCertainData {
  newItem: NewUserType | NewProductType | null;
  res: Response;
  collectionName: CollectionName;
  projection: string;
  match: {
    [index: string]: string;
  };
  next: NextFunction;
}

export async function getData({
  newItem,
  res,
  projection,
  collectionName,
  match,
  next,
}: GetCertainData) {
  try {
    if (newItem) {
      newItem.itemId = uuidv4();
      return res.status(200).json([newItem]);
    }
    if (!projection) return serverError("no projection");
    const usersCollection = db.collection(collectionName);
    const result = await usersCollection
      .aggregate([{ $match: match }, { $project: JSON.parse(projection) }])
      .toArray();
    if (!result) throw serverError("no item");
    res.status(200).json(result.filter(item => {
      if ('isNotAdmin' in item) {
        return item.isNotAdmin
      }
      return item
    }));
  } catch (err) {
    next(err);
  }
}
