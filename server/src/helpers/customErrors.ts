import { ValidateError } from "../../../common/src/operationResultType";
import { CustomError } from "./../middleware/errorMiddleware";

export function loginError() {
  return new CustomError({
    status: 'login error',
    HTTPStatusCode: 400,
    message: "bad login or password",
  });
}

export function serverError(message: string) {
  return new CustomError({
    status: 'server error',
    HTTPStatusCode: 500,
    message,
  });
}

export function validateError(validateErrors: ValidateError[]) {
  return new CustomError({
    status: 'validate error',
    HTTPStatusCode: 400,
    message: '',
    validateErrors,
  })
}

export function accessError({
  message,
  logout,
}: {
  message: string;
  logout: boolean;
}) {
  return new CustomError({
    status: 'access error',
    HTTPStatusCode: 403,
    message,
    logout,
  });
}
