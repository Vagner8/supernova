import { Middleware } from "./../db/types";
import { ValidationError } from "./errorMiddleware";

export enum ErrorName {
  ValidationError = "Validation Error:",
}

function validate(
  field: "name" | "email" | "password",
  item: string | number,
  length: { min: number; max: number }
) {
  const str = item.toString();

  if (str.length < length.min) {
    throw new ValidationError(
      `min ${field} is ${length.min} characters`,
      field
    );
  }
  if (str.length > length.max) {
    throw new ValidationError(
      `max ${field} is ${length.max} characters`,
      field
    );
  }

  switch (field) {
    case "email":
      if (!str.split("").includes("@")) {
        throw new ValidationError(
          `${field} is incorrect`,
          field
        );
      }
  }
}

export function validationMiddleware(): Middleware {
  return (req, res, next) => {
    if (!req.body) next();
    if (req.body.name) validate("name", req.body.name, { min: 1, max: 20 });
    if (req.body.email) validate("email", req.body.email, { min: 3, max: 30 });
    if (req.body.password)
      validate("password", req.body.password, { min: 6, max: 20 });
    next();
  };
}
