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
    const admin = await usersCollection.findOne({ "configs.login": login });
    if (!admin) throw loginError();

    if (admin.userId) {
      if (!bcrypt.compareSync(password, admin.configs.password))
        throw loginError();
      token.accessSetToCookie(token.sign('accessToken', admin.userId), res);
      token.refreshSave(
        admin.userId,
        token.sign('refreshToken', admin.userId),
        usersCollection
      );
      res.status(201).json({ adminId: admin.userId });
    }

    if (!admin.userId) {
      if (password !== admin.configs.password) throw loginError();
      const uniqueId = uuidv4();
      const encryptedPassword = await bcrypt.hash(password, 10);
      token.saveCredentials({
        usersCollection,
        login,
        refreshToken: token.sign('refreshToken', uniqueId),
        encryptedPassword,
        uniqueId,
      });
      token.accessSetToCookie(token.sign('accessToken', admin.userId), res);
      res.status(201).json({ adminId: uniqueId });
    }
  } catch (err) {
    next(err);
  }
}
