import { ImgsType } from "./commonTypes";
export declare type UserStatus = "Owner" | "Admin" | "User" | "Viewer" | "Fired" | "New" | "developer";
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
    selected?: boolean;
    userId: string;
    refreshToken: string;
    timestamp: string;
    credentials: UserConfigsType;
    personal: UserPersonalType;
    contacts: UserContactsType;
    address: UserAddressType;
    imgs: UserImgsType;
}
export declare type UserProfileType = Pick<UserType, "personal" | "contacts" | "address" | "imgs" | "credentials">;
export declare type UserProfileKeys = keyof UserProfileType;
export declare type ValidatedFields = UserConfigsType & UserPersonalType & UserContactsType & UserAddressType;
export declare type ValidatedFieldsKeys = keyof ValidatedFields;
export declare type UserRequiredFields = [
    "login",
    "password",
    "email",
    "name",
    "surname",
    "phone"
];
export declare type Project<T, S extends string | 0> = {
    [Key in keyof T]: S extends string ? `$${Lowercase<S & string>}.${Key & string}` : `$${Key & string}`;
};
export declare type UserProject = Project<UserType, 0> & Project<UserImgsType, "imgs"> & Project<UserConfigsType, "credentials"> & Project<UserPersonalType, "personal"> & Project<UserContactsType, "contacts"> & Project<UserAddressType, "address">;
//# sourceMappingURL=userTypes.d.ts.map