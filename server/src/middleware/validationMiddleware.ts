import { NextFunction, Request, Response } from "express";
import { validateError } from "./../helpers/customErrors";
import { CustomError } from "./errorMiddleware";

function validate(
  errorField: "login" | "email" | "password",
  item: string | number,
  length: { min: number; max: number }
) {
  const str = item.toString();

  if (str.length < length.min) {
    throw validateError(errorField, `min ${length.min} characters`);
  }

  if (str.length > length.max) {
    throw validateError(errorField, `max ${length.max} characters`);
  }

  switch (errorField) {
    case "email":
      if (!str.split("").includes("@")) {
        throw validateError(errorField, `incorrect ${errorField}`);
      }
  }
}

export function validationMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) next();
    if (req.body.login) validate("login", req.body.login, { min: 1, max: 20 });
    if (req.body.email) validate("email", req.body.email, { min: 3, max: 30 });
    if (req.body.password)
      validate("password", req.body.password, { min: 6, max: 20 });
    next();
  };
}
