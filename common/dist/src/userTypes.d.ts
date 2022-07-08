import { ImgsType } from "./commonTypes";
export declare type UserStatus = "Owner" | "Admin" | "User" | "Viewer" | "Fired" | "New" | "developer";
export interface UserSecretType {
    login: string;
    password: string;
}
export interface UserSettingsType {
    rule: UserStatus;
    timestamp: Date;
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
    selected?: boolean;
    secret: UserSecretType;
    settings: UserSettingsType;
    personal: UserPersonalType;
    contacts: UserContactsType;
    address: UserAddressType;
    imgs: UserImgsType;
}
export declare type UserProfileType = Pick<UserType, "personal" | "contacts" | "address" | "imgs" | "settings" | "secret">;
export declare type UserProfileKeys = keyof UserProfileType;
export declare type ValidatedFields = UserSecretType & UserSettingsType & UserPersonalType & UserContactsType & UserAddressType;
export declare type ValidatedFieldsKeys = keyof ValidatedFields;
export declare type UserRequiredFields = [
    "login",
    "password",
    "email",
    "name",
    "surname",
    "phone"
];
//# sourceMappingURL=userTypes.d.ts.map