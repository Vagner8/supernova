"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUsersDB = void 0;
const mongodb_1 = require("mongodb");
const errorHandlers_1 = require("./../share/errorHandlers");
const usersData_1 = require("./data/usersData");
const settings_1 = require("./settings");
const usersTypes_1 = require("./usersTypes");
class useDataBase {
    constructor(dataBase, newData) {
        this.dataBase = dataBase;
        this.newData = newData;
        this.client = new mongodb_1.MongoClient(settings_1.url);
    }
    connectDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                return this.client.db(this.dataBase);
            }
            catch (_a) {
                (0, errorHandlers_1.throwError)(this.connectDB.name, this.dataBase);
            }
        });
    }
    createDB() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connectDB();
                try {
                    for (var _b = __asyncValues(Object.entries(usersData_1.newUser)), _c; _c = yield _b.next(), !_c.done;) {
                        let [key, value] = _c.value;
                        let collection = db.collection(key);
                        yield collection.insertOne(value, {
                            writeConcern: { w: "majority", wtimeout: 5000 },
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (_d) {
                (0, errorHandlers_1.throwError)(this.createDB.name);
            }
        });
    }
    aggregate(query, collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.connectDB();
            const collection = db.collection(collectionName);
            return collection.aggregate(query);
        });
    }
    find(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connectDB();
                const collection = db.collection(collectionName);
                return collection.find();
            }
            catch (_a) {
                (0, errorHandlers_1.throwError)(this.createDB.name);
            }
        });
    }
    // public async findOne(query: Object, options: any) {
    //   try {
    //     const collection = await this.run();
    //     return collection.findOne(query, options);
    //   } catch (err) {
    //     console.dir(err);
    //   }
    // }
    // public async insertUsers() {
    //   try {
    //     const collection = await this.run();
    //     collection.insertMany(users);
    //   } catch (err) {}
    // }
    // public async lookup(query: Object[]) {
    //   try {
    //     const collection = await this.run();
    //     return collection.aggregate(query)
    //   } catch (err) {
    //     console.dir(err);
    //   }
    // }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
}
exports.useUsersDB = new useDataBase(usersTypes_1.DataBase.Users, usersData_1.newUser);
//# sourceMappingURL=useDataBase.js.map