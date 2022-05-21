import { NextFunction, Request, Response } from "express";
import { CollName } from "./../db/types";
import { superAdmin } from "./../db/useDataBase";
import { Err } from "./errorMiddleware";
import jwt from "jsonwebtoken";
import { UseToken } from "./../UseToken";

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = req.headers.ownerid;
      if (ownerId === "idle" || !ownerId || Array.isArray(ownerId)) {
        throw new Err(403, "no ownerId header", true);
      }

      const accessToken = req.cookies.accessToken;

      if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_SECRET, (err: any) => {
          if (err) {
            throw new Err(403, "access token is expired", true);
          }
          next();
        });
      }

      if (!accessToken) {
        const ownersColl = await superAdmin.connect(CollName.Owners);
        if (!ownersColl) {
          throw new Err(500, `no connection ${CollName.Owners}`, true);
        }
        const result = await ownersColl.findOne<{ refreshToken: string }>(
          { ownerId },
          { projection: { _id: 0, refreshToken: 1 } }
        );
        if (!result) {
          throw new Err(500, "no refreshToken", true);
        }
        jwt.verify(result.refreshToken, process.env.REFRESH_SECRET, (err: any) => {
          if (err) {
            throw new Err(403, "refresh token is expired", true);
          }
          const useToken = new UseToken(res)
          useToken.createAccessToken(ownerId)
          next();
        });
      }
      next();
    } catch (err) {
      next(err);
    } finally {
      await superAdmin.close();
    }
  };
