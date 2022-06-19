import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { CustomErrorType } from './../../../common/src/customErrorType'

export class CustomError extends Error {
  constructor(
    public description: CustomErrorType
  ) {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof CustomError) {
    return res.status(error.description.status).json(error.description);
  }
  if (error instanceof TokenExpiredError) {
    const response: CustomErrorType = {
      errorName: 'token warning',
      status: 403,
      message: "expired token, please relogin",
      field: null,
      logout: true,
    }
    return res.status(403).json(response);
  }
  next(error);
}
