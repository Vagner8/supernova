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
    if (!ownerId) throw new Err(400, `no ownerId: ${funcName}`);
    console.log('ownersColl')
    const ownersColl = await superAdmin.connect(CollName.Owners);
    if (!ownersColl) throw new Err(500, `no connection: ${funcName}`);
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
    if (!owner) throw new Err(500, `owner no found: ${funcName}`);
    res.status(200).json(owner);
  } catch (err) {
    next(err);
  } finally {
    await superAdmin.close();
  }
}
