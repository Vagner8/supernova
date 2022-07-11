import { BaseType } from "./commonTypes";
export declare type UserStatus = "Owner" | "Admin" | "User" | "Viewer" | "Fired" | "New" | "Developer";
export interface UserSecretType {
    login: string;
    password: string;
}
export interface UserSettingsType {
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
export interface UserType extends BaseType {
    refreshToken: string;
    secret: UserSecretType;
    settings: UserSettingsType;
    personal: UserPersonalType;
    contacts: UserContactsType;
    address: UserAddressType;
}
//# sourceMappingURL=userTypes.d.ts.map