import { ProductCardType, ProductImgsType, ProductProfilePointsType, ProductSettingsType } from "./productTypes";
import { UserAddressType, UserContactsType, UserPersonalType, UserSecretType, UserSettingsType } from "./userTypes";
export interface ImgsType {
    avatar: string[];
    photos: string[];
}
export declare type ValidatedFields = UserSecretType & UserSettingsType & UserPersonalType & UserContactsType & UserAddressType & ProductCardType & ProductProfilePointsType & ProductSettingsType & ProductImgsType;
export declare type UserRequiredFields = [
    "login",
    "password",
    "email",
    "name",
    "surname",
    "phone"
];
export declare type CustomErrorStatuses = "success" | "login error" | "server error" | "validate error" | "access error" | "firebase error" | "token warning" | "warning";
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
//# sourceMappingURL=commonTypes.d.ts.map