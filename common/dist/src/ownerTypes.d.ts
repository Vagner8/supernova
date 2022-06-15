import { ContactsType, ImgUrlsType, PersonalType, AddressType } from "./commonTypes";
export interface PersonalOwnerType extends PersonalType {
}
export interface ContactsOwnerType extends ContactsType {
}
export interface AddressOwnerType extends AddressType {
}
export declare type OwnerPIIType = Pick<OwnerType, 'personal' | 'contacts' | 'address' | 'imgUrls'>;
export interface OwnerType {
    _id: string;
    ownerId: string;
    login: string;
    password: string;
    personal: PersonalOwnerType;
    contacts: ContactsOwnerType;
    address: AddressOwnerType;
    imgUrls: ImgUrlsType;
}
//# sourceMappingURL=ownerTypes.d.ts.map