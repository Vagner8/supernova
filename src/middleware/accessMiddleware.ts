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
        throw new Err({
          status: 403,
          text: "no ownerId header",
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
              text: "access token is expired",
              field: null,
              logout: true,
            });
          }
        });
      }

      if (!accessToken) {
        const ownersColl = await superAdmin.connect(CollName.Owners);
        if (!ownersColl) {
          throw new Err({
            status: 500,
            text: `no connection ${CollName.Owners}`,
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
            text: "no refreshToken",
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
                text: "refresh token is expired",
                field: null,
                logout: true,
              });
            }
            const useToken = new UseToken(res);
            useToken.createAccessToken(ownerId);
          }
        );
      }
    } catch (err) {
      next(err);
    } finally {
      await superAdmin.close();
      next();
    }
  };
