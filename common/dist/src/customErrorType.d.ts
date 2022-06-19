export declare type CustomErrorName = "login error" | "server error" | "validate error" | "access error" | "token warning";
export interface CustomErrorType {
    errorName: CustomErrorName;
    status: 400 | 403 | 500;
    message: string;
    logout: boolean;
    field: string | null;
}
//# sourceMappingURL=customErrorType.d.ts.map