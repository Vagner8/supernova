import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { MONGO_DB } from "../../middleware/connectMongo";
import { UserType } from "../../../../common/src/userTypes"
import { USER_ID } from "./../../middleware/accessMiddleware";
import { validateError, serverError } from "../../helpers/customErrors";


export const newUser: Omit<UserType, '_id' | 'refreshToken' | 'userId'> = {
  configs: {
    login: '',
    password: '',
    rule: 'New'
  },
  personal: {
    name: '',
    surname: '',
  },
  contacts: {
    email: '',
    phone: '',
  },
  address: {
    city: '',
    zip: '',
    street: '',
    number: '',
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
    const {projection, userId} = req.query as {projection: undefined | string, userId: string};
    if (userId === 'new') {
      return res.status(200).json(newUser);
    }
    if (!projection) throw validateError(null, 'bad projection')
    const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users)
    if (!usersColl) throw serverError("bad connection")
    const user = await usersColl.findOne(
      { userId: userId || USER_ID },
      { projection: JSON.parse(projection) }
    )
    if (!user) throw serverError("no user")
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
