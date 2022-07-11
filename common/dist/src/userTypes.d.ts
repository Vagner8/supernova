import { ImgsType } from "./commonTypes";
export declare type UserStatus = "Owner" | "Admin" | "User" | "Viewer" | "Fired" | "New" | "developer";
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
export interface UserImgsType extends ImgsType {
}
export interface UserType {
    _id?: string;
    userId: string;
    refreshToken: string;
    created: string;
    selected?: boolean;
    secret: UserSecretType;
    settings: UserSettingsType;
    personal: UserPersonalType;
    contacts: UserContactsType;
    address: UserAddressType;
    imgs: UserImgsType;
}
export declare type ValidatedFields = UserSecretType & UserSettingsType & UserPersonalType & UserContactsType & UserAddressType;
export declare type UserRequiredFields = [
    "login",
    "password",
    "email",
    "name",
    "surname",
    "phone"
];
//# sourceMappingURL=userTypes.d.ts.map