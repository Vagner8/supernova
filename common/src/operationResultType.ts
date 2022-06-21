export type CustomErrorStatuses =
  | "success"
  | "login error"
  | "server error"
  | "validate error"
  | "access error"
  | "firebase error"
  | "token warning";

export interface ValidateError {
  field: string;
  message: string;
}

export interface OperationResultType {
  status: CustomErrorStatuses;
  message: string;
  logout?: boolean;
  validateErrors?: ValidateError[];
  HTTPStatusCode?: 400 | 403 | 500;
}
