import { MongoAPIError } from "mongodb";
import { ErrorMiddleware } from "./../db/types";

export class ValidationError extends Error {
  constructor(public message: string, public field: string) {
    super();
  }
}

export const errorMiddleware: ErrorMiddleware = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: true,
      message: error.message,
      field: error.field
    });
  }
  if (error instanceof MongoAPIError) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
  next(error);
};
