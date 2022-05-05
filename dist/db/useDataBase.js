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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSuperAdmin = void 0;
const mongodb_1 = require("mongodb");
const errorHandlers_1 = require("./../share/errorHandlers");
const settings_1 = require("./settings");
const types_1 = require("./types");
class useDataBase {
    constructor(dataBase) {
        this.dataBase = dataBase;
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
    find(collectionName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield this.connectDB();
                const collection = db.collection(collectionName);
                return collection.find();
            }
            catch (_a) {
                (0, errorHandlers_1.throwError)(this.find.name);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
}
exports.useSuperAdmin = new useDataBase(types_1.DataBase.SuperAdmin);
//# sourceMappingURL=useDataBase.js.map