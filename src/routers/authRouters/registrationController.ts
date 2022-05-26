import { NextFunction, Request, Response } from "express";
import { CollName } from "../../db/types";
import { superAdmin } from "../../db/useDataBase";
import bcrypt from "bcryptjs";
import { Err } from "../../middleware/errorMiddleware";
import { v4 as uuidv4 } from "uuid";
import { UseToken } from "./../../UseToken";
import jwt from "jsonwebtoken";

interface EeqBody {
  login: string;
  password: string;
}

export async function registrationController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const funcName = registrationController.name;
  const { login, password } = req.body as EeqBody;
  try {
    const ownersColl = await superAdmin.connect(CollName.Owners);
    if (!ownersColl) {
      throw new Err({
        status: 500,
        message: `no connection: ${funcName}`,
        field: null,
        logout: false,
      });
    }
    const useToken = new UseToken(res, ownersColl);
    const owner = await ownersColl.findOne({ login });
    if (!owner) {
      throw new Err({
        status: 403,
        message: `${login} not exist`,
        field: "login",
        logout: false,
      });
    }
    if (owner.ownerId) {
      if (!bcrypt.compareSync(password, owner.password)) {
        throw new Err({
          status: 400,
          message: "incorrect",
          field: "password",
          logout: false,
        });
      }
      useToken.createAccessToken(owner.ownerId);
      await useToken.createRefreshToken(owner.ownerId);
      res.status(201).json({ ownerId: owner.ownerId });
    }

    if (!owner.ownerId) {
      if (password !== owner.password) {
        throw new Err({
          status: 400,
          message: "incorrect",
          field: "password",
          logout: false,
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const uniqueId = uuidv4();
      const refreshToken = jwt.sign({ownerId: uniqueId}, process.env.REFRESH_SECRET)
      const result = await ownersColl.updateOne(
        { login },
        {
          $set: {
            refreshToken,
            ownerId: uniqueId,
            password: encryptedPassword,
          },
        }
      );
      useToken.createAccessToken(uniqueId);
      res.status(201).json({ownerId: uniqueId});
    }
  } catch (err) {
    next(err);
  } finally {
    await superAdmin.close();
  }
}
