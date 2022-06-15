import { NextFunction, Request, Response } from "express";
import { MONGO_DB } from "./../../../middleware/connectMongo";
import { OWNER_ID } from "./../../../middleware/accessMiddleware";
import { CollName } from "./../../../types";
import { Err } from "./../../../middleware/errorMiddleware";
import { OwnerPIIType, OwnerType } from "../../../../../common/src/ownerTypes";

export async function updateOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ownersColl = MONGO_DB.collection<OwnerType>(CollName.Owners)
    const ownerPII = req.body as OwnerPIIType
    if (!ownersColl) {
      throw new Err({
        status: 500,
        message: "no connection",
        field: null,
        logout: false,
      });
    }
    const result = await ownersColl.updateOne(
      {ownerId: OWNER_ID},
      {$set: ownerPII}
    )
    if (!result.acknowledged) {
      throw new Err({
        status: 500,
        message: "data did not update",
        field: null,
        logout: false,
      });
    }
    res.status(200).json(result)
  } catch (err) {
    next(err);
  }
}
