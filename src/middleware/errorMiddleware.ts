import { MongoAPIError } from "mongodb";
import { ErrorMiddleware } from "./../db/types";

export class ValidationError extends Error {
  constructor(public errorMessage: string, public errorField: string | null) {
    super();
  }
}

export const errorMiddleware: ErrorMiddleware = (error, req, res, next) => {
  console.log('errorMiddleware', 'errorMiddleware')
  if (error instanceof ValidationError) {
    return res.status(400).json({
      errorMessage: error.errorMessage,
      errorField: error.errorField,
    });
  }
  if (error instanceof MongoAPIError) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
  next(error);
};
