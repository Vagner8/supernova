import { NextFunction, Request, Response } from "express";
import { ValidateError } from "../../../common/src/operationResultType";
import { validateError } from "../helpers/customErrors";

interface ReqBody {
  login?: string;
  email?: string;
  password?: string;
}

type Fields = "login" | "email" | "password";

interface ValidateOptions {
  max: number;
  min: number;
  requiredChars?: string[];
}

const validateErrors: ValidateError[] = [];

function validate(field: Fields, value: string, options: ValidateOptions) {
  if (value.length < options.min)
    validateErrors.push({ field, message: `min ${options.min} chars` });
  if (value.length > options.max)
    validateErrors.push({ field, message: `max ${options.max} chars` });
}

export const validateMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as ReqBody | undefined;
    if (!body) next();
    if (body.login) validate("login", body.login, { min: 5, max: 10 });
    if (body.password) validate("password", body.password, { min: 6, max: 15 });
    if (validateErrors) throw validateError(validateErrors)
    next();
  };
