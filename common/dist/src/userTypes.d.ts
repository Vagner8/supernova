import { ImgsType } from "./commonTypes";
export declare type UserStatus = "Owner" | "Admin" | "User" | "Viewer" | "Fired" | "New";
export interface UserConfigsType {
    login: string;
    password: string;
    rule: UserStatus;
}
export interface UserPersonalType {
    name: string;
    surname: string;
}
export interface UserContactsType {
    email: string;
    phone: string;
}
export interface UserAddressType {
    city: string;
    zip: string;
    street: string;
    number: string;
}
export interface UserImgsType extends ImgsType {
}
export interface UserType {
    _id: Object;
    userId: string;
    refreshToken: string;
    configs: UserConfigsType;
    personal: UserPersonalType;
    contacts: UserContactsType;
    address: UserAddressType;
    imgs: UserImgsType;
}
export declare type UserPointsType = Pick<UserType, "personal" | "contacts" | "address" | "imgs" | "configs">;
export declare type UserKeyPoints = keyof UserPointsType;
export declare type ValidatedFields = UserConfigsType & UserPersonalType & UserContactsType & UserAddressType;
export declare type ValidatedFieldsKeys = keyof ValidatedFields;
export declare type RequiredFields = ["login", "password", "email", "name", "surname", "phone"];
//# sourceMappingURL=userTypes.d.ts.map