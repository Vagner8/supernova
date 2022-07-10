import { NextFunction, Response } from "express";
import { db } from "../../app";
import { serverError } from "../../helpers/errors";
import { CollectionName } from "../../types";
import { NewProductType } from "../newItems/newProduct";
import { NewUserType } from "../newItems/newUser";

interface GetCertainData {
  newItem: NewUserType | NewProductType | null;
  res: Response;
  collectionName: CollectionName;
  projection: string;
  match: {
    [index: string]: string
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
    if (newItem) return res.status(200).json([newItem]);
    if (!projection) return serverError("no projection");
    const usersCollection = db.collection(collectionName);
    const result = await usersCollection
      .aggregate([{ $match: match }, { $project: JSON.parse(projection) }])
      .toArray();
    if (!result) throw serverError("no item");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
