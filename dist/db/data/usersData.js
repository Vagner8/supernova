"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = void 0;
const usersDataBaseTypes_1 = require("../usersDataBaseTypes");
exports.newUser = {
    [usersDataBaseTypes_1.UsersCollections.Personal]: {
        userId: "newUser",
        img: 'https://upload.wikimedia.org/wikipedia/en/7/70/Terminator1984movieposter.jpg',
        name: "Arnold",
        surname: "Schwarzenegger",
        birth: "1983-10-9T22:00:00.000Z",
    },
    [usersDataBaseTypes_1.UsersCollections.Address]: {
        userId: "newUser",
        city: "Karlovy Vary",
        zip: "36005",
        street: "U Koupaliste",
        numberHouse: "2",
    },
    [usersDataBaseTypes_1.UsersCollections.Contacts]: {
        userId: 'newUser',
        phone: "+420776544634",
        email: "email@email.com",
    },
    [usersDataBaseTypes_1.UsersCollections.Settings]: {
        userId: "newUser",
        registration: "2022-4-10T10:37:00.000Z",
        role: "user",
        selected: false,
        disabled: false,
    },
    [usersDataBaseTypes_1.UsersCollections.Security]: {
        userId: 'newUser',
        password: ''
    }
};
//# sourceMappingURL=usersData.js.map