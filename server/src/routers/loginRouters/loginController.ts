import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { UserType } from "../../../../common/src/userTypes";
import { loginError } from "../../helpers/errors";
import bcrypt from "bcryptjs";
import { token } from "../../helpers/token";
import { db } from "../../app";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { login, password } = req.body as { login: string; password: string };

  try {
    const usersCollection = db.collection<UserType>(CollectionName.Users);
    const admin = await usersCollection.findOne({ "secret.login": login });
    if (!admin) throw loginError();
    // if (password !== admin.secret.password) throw loginError();
    // console.log( password, admin.secret.password )
    if (!bcrypt.compareSync(password, admin.secret.password))
      throw loginError();
    token.accessSetToCookie(token.sign("accessToken", admin.userId), res);
    token.refreshSave({
      adminId: admin.userId,
      refreshToken: token.sign("refreshToken", admin.userId),
      usersCollection,
      next,
    });
    res.status(201).json({ adminId: admin.userId });
  } catch (err) {
    next(err);
  }
}
