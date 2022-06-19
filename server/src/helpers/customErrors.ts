import { CustomError } from "./../middleware/errorMiddleware";

export function loginError() {
  return new CustomError({
    errorName: 'login error',
    status: 400,
    message: "bad login or password",
    logout: false,
    field: null,
  });
}

export function serverError(message: string) {
  return new CustomError({
    errorName: 'server error',
    status: 500,
    message,
    logout: false,
    field: null,
  });
}

export function validateError(field: string, message: string) {
  return new CustomError({
    errorName: 'validate error',
    status: 400,
    message,
    logout: false,
    field,
  });
}

export function accessError({
  message,
  logout,
}: {
  message: string;
  logout: boolean;
}) {
  return new CustomError({
    errorName: 'access error',
    status: 403,
    message,
    logout,
    field: null,
  });
}
