"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const usersTypes_1 = require("../usersTypes");
exports.newUser = {
    [usersTypes_1.UsersCollections.Personal]: {
        userId: "new",
        name: "Arnold",
        surname: "Schwarzenegger",
        birth: "1983-10-9T22:00:00.000Z",
    },
    [usersTypes_1.UsersCollections.Address]: {
        userId: "new",
        city: "Karlovy Vary",
        zip: "36005",
        street: "U Koupaliste",
        numberHouse: "2",
    },
    [usersTypes_1.UsersCollections.Contact]: {
        userId: 'new',
        phone: "+420776544634",
        email: "email@email.com",
    },
    [usersTypes_1.UsersCollections.Settings]: {
        userId: "new",
        registration: "2022-4-10T10:37:00.000Z",
        role: "user",
        selected: false,
        disabled: false,
    },
    [usersTypes_1.UsersCollections.Security]: {
        userId: 'new',
        password: ''
    }
};
//# sourceMappingURL=usersData.js.map