import { NextFunction, Request, Response } from "express";
import { CollectionName } from "../../types";
import { v4 as uuidv4 } from "uuid";
import { MONGO_DB } from "../../middleware/connectMongo";
import { UserType } from "../../../../common/src/userTypes";
import { loginError, serverError } from "../../helpers/customErrors";
import bcrypt from "bcryptjs";
import { writeRefreshTokenWithoutUserId } from "../../token/writeRefreshTokenWithoutUserId";
import { createAccessToken } from "../../token/createAccessToken";
import { createRefreshToken } from "../../token/createRefreshToken";
import { writeRefreshToken } from "../../token/writeRefreshToken";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { login, password } = req.body as { login: string; password: string };

  try {
    const usersColl = MONGO_DB.collection<UserType>(CollectionName.Users);
    if (!usersColl) throw serverError("bad connection");
    const user = await usersColl.findOne({ "configs.login": login });
    if (!user) throw loginError();

    if (user.userId) {
      if (!bcrypt.compareSync(password, user.configs.password)) loginError();
      createAccessToken(user.userId, res);
      const refreshToken = createRefreshToken(user.userId);
      const result = await writeRefreshToken(
        user.userId,
        refreshToken,
        usersColl
      );
      if (!result.acknowledged) throw serverError("bad update");
      res.status(201).json({ userId: user.userId });
    }

    if (!user.userId) {
      if (password !== user.configs.password) throw loginError();
      const uniqueId = uuidv4();
      const result = await writeRefreshTokenWithoutUserId({
        usersColl,
        login,
        password,
        refreshToken: createRefreshToken(uniqueId),
        uniqueId,
      });
      if (!result.acknowledged) throw serverError("bad update");
      createAccessToken(uniqueId, res);
      res.status(201).json({ userId: uniqueId });
    }
  } catch (err) {
    next(err);
  }
}