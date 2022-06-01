export interface Owner {
    _id: string;
    ownerId: string;
    login: string;
    personal: Personal;
    contacts: Contacts;
    address: Address;
    password: string;
}
export interface Personal {
    name: string;
    surname: string;
    avatar: string;
}
export interface Contacts {
    email: string;
    phone: string;
}
export interface Address {
    city: string;
    zip: string;
    street: string;
    number: string;
}
//# sourceMappingURL=owner.d.ts.map