import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { mongo } from "../../helpers/mongo";
import { getData } from "../controllers/getData";

export async function getProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { productId, projection } = req.query as {
    productId: string;
    projection: string;
  };
  // getData({
  //   newItem: productId === "new" ? newUser : null,
  //   match: userId ? { userId } : {},
  //   projection,
  //   collectionName: CollectionName.Products,
  //   res,
  //   next,
  // });
  // try {
  //   const { userId, projection } = req.query as { userId: string, projection: string } ;
  //   if (!projection) return serverError("no projection");
  //   const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
  //   const match = userId ? { userId } : {};
  //   const users = await usersCollection
  //     .aggregate([{ $match: match }, { $project: JSON.parse(projection) }])
  //     .toArray();
  //   if (!users) throw serverError("no user");
  //   res.status(200).json(users);
  // } catch (err) {
  //   next(err);
  // }
}