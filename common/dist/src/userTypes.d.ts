import { ContactsType, ImgUrlsType, PersonalType, AddressType } from "./commonTypes";
export declare enum UserStatus {
    Admin = "Admin",
    User = "User",
    Viewer = "Viewer",
    fired = "fired",
    New = "New"
}
export interface PersonalUserType extends PersonalType {
}
export interface ContactsUserType extends ContactsType {
}
export interface AddressUserType extends AddressType {
}
export declare type UserPIIType = Pick<UserType, 'personal' | 'contacts' | 'address' | 'imgUrls'>;
export interface UserType {
    _id: string;
    userId: string;
    login: string;
    password: string;
    rule: UserStatus;
    personal: PersonalUserType;
    contacts: ContactsUserType;
    address: AddressUserType;
    imgUrls: ImgUrlsType;
}
//# sourceMappingURL=userTypes.d.ts.map