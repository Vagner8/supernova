import { NextFunction, Request, Response } from "express";
import { validateError } from "../helpers/errors";
import { validator } from "../helpers/validator";

export const validateMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET" || req.method === "DELETE") return next();
    const map = validator.set(req.body);
    console.log(map)
    if (!map?.size) return next();
    const errs = validator.check(map);
    if (errs.length > 0) throw validateError(errs);
    next();
  };
