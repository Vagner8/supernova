import { NextFunction, Request, Response } from "express";

export class Err extends Error {
  constructor(public obj: {
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
    return res.status(error.obj.status).json(error.obj);
  }
  next(error);
}
