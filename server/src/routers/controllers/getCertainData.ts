import { NextFunction, Response } from "express";
import { serverError } from "../../helpers/errors";
import { mongo } from "../../helpers/mongo";
import { CollectionName } from "../../types";
import { NewUserType } from "../userRouters/newUser";

interface GetCertainData {
  newItem: NewUserType | null;
  res: Response;
  collectionName: CollectionName;
  projection: string;
  match: {
    [index: string]: string
  };
  next: NextFunction;
}

export async function getCertainData({
  newItem,
  res,
  projection,
  collectionName,
  match,
  next,
}: GetCertainData) {
  try {
    if (newItem) return res.status(200).json(newItem);
    if (!projection) return serverError("no projection");
    const usersCollection = mongo.getCollection(collectionName);
    const result = await usersCollection
      .aggregate([{ $match: match }, { $project: JSON.parse(projection) }])
      .toArray();
    if (!result) throw serverError("no item");
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
