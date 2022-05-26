import { NextFunction, Request, Response } from "express";
import { superAdmin } from "./../../db/useDataBase";
import { CollName } from "./../../db/types";
import { Err } from "./../../middleware/errorMiddleware";

export async function getOwnerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const funcName = getOwnerController.name;
  try {
    const ownerId = req.query.ownerId as string | undefined;
    if (!ownerId) {
      throw new Err({
        status: 403,
        message: `no ownerId: ${funcName}`,
        field: null,
        logout: false,
      });
    }
    const ownersColl = await superAdmin.connect(CollName.Owners);
    if (!ownersColl) {
      throw new Err({
        status: 500,
        message: `no connection: ${funcName}`,
        field: null,
        logout: false,
      });
    }
    const owner = await ownersColl.findOne(
      { ownerId },
      {
        projection: {
          _id: 0,
          ownerId: 0,
          password: 0,
          refreshToken: 0,
        },
      }
    );
    if (!owner) {
      throw new Err({
        status: 500,
        message: `owner no found: ${funcName}`,
        field: null,
        logout: false,
      });
    }
    res.status(200).json(owner);
  } catch (err) {
    next(err);
  } finally {
    await superAdmin.close();
  }
}
