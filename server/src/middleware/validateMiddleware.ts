import { NextFunction, Request, Response } from "express";
import { validateError } from "../helpers/customErrors";
import { getValidateFields, validator } from "../helpers/customValidation";

export const validateMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "GET" || req.method === "DELETE") return next();
    const map = getValidateFields(req.body);
    if (!map?.size) return next();
    const errs = validator(map);
    if (errs.length > 0) throw validateError(errs);
    next();
  };
