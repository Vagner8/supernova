import { ErrorMiddleware } from "./../db/types";

export class Err extends Error {
  constructor(public status: 403 | 500, public errorMessage: string, public logout: boolean) {
    super();
  }
}

export class FormErr extends Error {
  constructor(public errorMessage: string, public errorField: string | null) {
    super();
  }
}

export const errorMiddleware: ErrorMiddleware = (error, req, res, next) => {
  if (error instanceof FormErr) {
    return res.status(400).json({
      errorMessage: error.errorMessage,
      errorField: error.errorField,
    });
  }
  if (error instanceof Err) {
    return res.status(error.status).json({
      errorMessage: error.errorMessage,
      logout: error.logout
    });
  }
  next(error);
};
