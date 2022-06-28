import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserType } from "../../../../common/src/userTypes";
import { serverError } from "../../helpers/errors";
import { mongo } from "../../helpers/mongo";
import { Projection } from "../../../../common/src/commonTypes";

export const newUser: Omit<UserType, "_id" | "refreshToken" | "userId"> = {
  credentials: {
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

const projection: Projection<UserType> = {
  _id: 0,
  personal: 1,
  contacts: 1,
  address: 1,
  imgs: {
    avatar: 1
  },
  credentials: {
    login: 1,
    rule: 1,
  },
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.query as { userId: string };
    if (userId === "new") return res.status(200).json(newUser);
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
    const user = await usersCollection.findOne(
      { userId },
      { projection }
    );
    if (!user) throw serverError("no user");
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
