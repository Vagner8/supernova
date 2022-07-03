export declare type CustomErrorName =
  | "login error"
  | "server error"
  | "validate error"
  | "access error"
  | "firebase error"
  | "token warning"
  | "warming";
export interface ValidateError {
  field: string;
  message: string;
}
export interface OperationResultType {
  status: "success" | "error" | "warning";
  errorName: CustomErrorName;
  message: string;
  logout: boolean;
  validateErrors: ValidateError[] | null;
  HTTPStatusCode?: 400 | 403 | 500;
}
//# sourceMappingURL=customErrorType.d.ts.map
