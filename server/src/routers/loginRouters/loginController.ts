import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { UserType } from "../../../../common/src/userTypes";
import { loginError } from "../../helpers/errors";
import bcrypt from "bcryptjs";
import { mongo } from "../../helpers/mongo";
import { token } from "../../helpers/token";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { login, password } = req.body as { login: string; password: string };

  try {
    const usersCollection = mongo.getCollection<UserType>(CollectionName.Users);
    const admin = await usersCollection.findOne({ "credentials.login": login });
    if (!admin) throw loginError();
    if (!bcrypt.compareSync(password, admin.credentials.password))
      throw loginError();
    token.accessSetToCookie(token.sign("accessToken", admin.userId), res);
    token.refreshSave(
      admin.userId,
      token.sign("refreshToken", admin.userId),
      usersCollection
    );
    res.status(201).json({ adminId: admin.userId });
  } catch (err) {
    next(err);
  }
}
