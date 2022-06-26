import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { MONGO_DB } from "../../middleware/connectMongo";
import { UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { mongo } from "../../helpers/mongo";

export const newUser: Omit<UserType, "_id" | "refreshToken" | "userId"> = {
  configs: {
    login: "",
    password: "",
    rule: "New",
  },
  personal: {
    name: "",
    surname: "",
  },
  contacts: {
    email: "",
    phone: "",
  },
  address: {
    city: "",
    zip: "",
    street: "",
    number: "",
  },
  imgs: {
    avatar: [],
    photos: [],
  },
};

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { projection, userId } = req.query as {
      projection: undefined | string;
      userId: string;
    };
    const adminId = req.headers.adminid;
    if (userId === "new") return res.status(200).json(newUser);
    if (!projection) throw serverError("bad projection");
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
    const user = await usersCollection.findOne(
      { userId: userId || adminId },
      { projection: JSON.parse(projection) }
    )
    if (!user) throw serverError("no user");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
