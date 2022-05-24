import { NextFunction, Request, Response } from "express";
import { Err } from "./errorMiddleware";

function validate(
  errorField: "name" | "email" | "password",
  item: string | number,
  length: { min: number; max: number }
) {
  const str = item.toString();

  if (str.length < length.min) {
    throw new Err({
      status: 400,
      text: `min ${length.min} characters`,
      logout: false,
      field: errorField
    })
  }
  if (str.length > length.max) {
    throw new Err({
      status: 400,
      text: `max ${length.max} characters`,
      logout: false,
      field: errorField
    });
  }

  switch (errorField) {
    case "email":
      if (!str.split("").includes("@")) {
        throw new Err({
          status: 400,
          text: `incorrect ${errorField}`,
          logout: false,
          field: errorField
        });
      }
  }
}

export function validationMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) next();
    if (req.body.name) validate("name", req.body.name, { min: 1, max: 20 });
    if (req.body.email) validate("email", req.body.email, { min: 3, max: 30 });
    if (req.body.password)
      validate("password", req.body.password, { min: 6, max: 20 });
    next();
  };
}
