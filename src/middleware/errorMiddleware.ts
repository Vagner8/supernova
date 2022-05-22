import { NextFunction, Request, Response } from "express";

export class Err extends Error {
  constructor(
    public status: 400 | 403 | 500,
    public errorMessage: string,
    public logout: boolean = false
  ) {
    super();
  }
}

export class FormErr extends Error {
  constructor(public errorMessage: string, public errorField: string | null) {
    super();
  }
}

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof FormErr) {
    return res.status(400).json({
      errorMessage: error.errorMessage,
      errorField: error.errorField,
    });
  }
  if (error instanceof Err) {
    return res.status(error.status).json({
      errorMessage: error.errorMessage,
      logout: error.logout,
    });
  }
  next(error);
}
