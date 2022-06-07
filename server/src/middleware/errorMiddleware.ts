import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

export class Err extends Error {
  constructor(public description: {
    status: 400 | 403 | 500,
    message: string,
    logout: boolean,
    field: string | null
  }
  ) {
    super();
  }
}

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof Err) {
    return res.status(error.description.status).json(error.description);
  }
  if (error instanceof TokenExpiredError) {
    return res.status(403).json({
      status: 403,
      message: "token is expired",
      field: null,
      logout: true,
    })
  }
  next(error);
}
