import { NextFunction, Request, Response } from "express";
import { CollName } from "../../../types";
import { Err } from "../../../middleware/errorMiddleware";
import { Owner } from "./../../../../common/owner"
import { MONGO_DB } from "./../../../middleware/connectMongo";
import { OWNER_ID } from "./../../../middleware/accessMiddleware";

export async function getOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const projection = req.query.projection as undefined | string;
    if (!projection) {
      throw new Err({
        status: 403,
        message: "no projection",
        field: null,
        logout: false,
      });
    }
    const ownersColl = MONGO_DB.collection<Owner>(CollName.Owners)
    if (!ownersColl) {
      throw new Err({
        status: 500,
        message: "no connection",
        field: null,
        logout: false,
      });
    }
    const owner = await ownersColl.findOne(
      { ownerId: OWNER_ID },
      { projection: JSON.parse(projection) }
    )
    if (!owner) {
      throw new Err({
        status: 500,
        message: "owner no found",
        field: null,
        logout: false,
      });
    }
    res.status(200).json(owner);
  } catch (err) {
    next(err);
  }
}
