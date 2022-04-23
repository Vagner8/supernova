"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserData = void 0;
const usersTypes_1 = require("../usersTypes");
const usersData_1 = require("./usersData");
class IndexData {
    constructor(data, collections) {
        this.data = data;
        this.collections = collections;
    }
}
exports.newUserData = new IndexData(usersData_1.user, (0, usersTypes_1.getCollectionsFromEnum)(usersTypes_1.UsersCollections));
//# sourceMappingURL=indexData.js.map