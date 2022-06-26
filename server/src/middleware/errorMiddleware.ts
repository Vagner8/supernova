import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { OperationResultType } from "../../../common/src/operationResultType";

export class CustomError extends Error {
  constructor(public description: OperationResultType) {
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
    return res.status(error.description.HTTPStatusCode || 500).json(error.description);
  }
  if (error instanceof TokenExpiredError) {
    const response: OperationResultType = {
      status: "token warning",
      HTTPStatusCode: 403,
      message: "expired token, please relogin",
      logout: true,
    };
    return res.status(403).json(response);
  }
  next(error);
}
