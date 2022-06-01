import { NextFunction, Request, Response } from "express";
import { db, restartServer } from "../../../app";
import { CollName } from "../../../types";
import { Err } from "../../../middleware/errorMiddleware";
import { Owner } from "./../../../../common/owner"

export async function getOwner(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const ownerId = req.headers.ownerid as undefined | string;
    const projection = req.query.projection as undefined | string;
    if (!ownerId || !projection) {
      throw new Err({
        status: 403,
        message: "no ownerId or projection",
        field: null,
        logout: false,
      });
    }
    const ownersColl = db.collection<Owner>(CollName.Owners)
    if (!ownersColl) {
      restartServer()
      throw new Err({
        status: 500,
        message: "no connection",
        field: null,
        logout: false,
      });
    }
    const owner = await ownersColl.findOne(
      { ownerId },
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
