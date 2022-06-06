import { NextFunction, Request, Response } from "express";
import { MONGO_DB } from "./../../../middleware/connectMongo";
import { OWNER_ID } from "./../../../middleware/accessMiddleware";
import { CollName } from "./../../../types";
import { Owner } from "./../../../../common/owner"
import { Err } from "./../../../middleware/errorMiddleware";
import { OwnerPII } from "./../../../../common/owner"

export async function updateOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ownersColl = MONGO_DB.collection<Owner>(CollName.Owners)
    const ownerPII = req.body as OwnerPII
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
      {
        personal: ownerPII.personal,
        contacts: ownerPII.contacts,
        address: ownerPII.address,
      }
    )
  } catch (err) {
    next(err);
  }
}
