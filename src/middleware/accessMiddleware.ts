import { NextFunction, Request, Response } from "express";
import { CollName } from "../types";
import { Err } from "./errorMiddleware";
import jwt from "jsonwebtoken";
import { UseToken } from "./../UseToken";
import { db, restartServer } from "./../app";
import { Owner } from './../../common/owner'

export const accessMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ownerId = req.headers.ownerid;
      if (ownerId === "idle" || !ownerId || Array.isArray(ownerId)) {
        throw new Err({
          status: 403,
          message: "no ownerId header",
          field: null,
          logout: true,
        });
      }

      const accessToken = req.cookies.accessToken;

      if (accessToken) {
        jwt.verify(accessToken, process.env.ACCESS_SECRET, (err: any) => {
          if (err) {
            throw new Err({
              status: 403,
              message: "access token is expired",
              field: null,
              logout: true,
            });
          }
        });
      }

      if (!accessToken) {
        const ownersColl = db.collection<Owner>(CollName.Owners)
        if (!ownersColl) {
          restartServer()
          throw new Err({
            status: 500,
            message: `no connection ${CollName.Owners}`,
            field: null,
            logout: true,
          });
        }
        const result = await ownersColl.findOne<{ refreshToken: string }>(
          { ownerId },
          { projection: { _id: 0, refreshToken: 1 } }
        );
        if (!result) {
          throw new Err({
            status: 500,
            message: "no refreshToken",
            field: null,
            logout: true,
          });
        }
        jwt.verify(
          result.refreshToken,
          process.env.REFRESH_SECRET,
          (err: any) => {
            if (err) {
              throw new Err({
                status: 403,
                message: "refresh token is expired",
                field: null,
                logout: true,
              });
            }
            new UseToken(res).createAccessToken(ownerId);
          }
        );
      }
    } catch (err) {
      next(err);
    } finally {
      next();
    }
  };
