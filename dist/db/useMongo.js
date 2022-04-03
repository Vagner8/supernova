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
exports.settingsDB = exports.usersDB = void 0;
const mongodb_1 = require("mongodb");
const types_1 = require("./types");
class UseMongo {
    constructor(cluster, collection) {
        this.cluster = cluster;
        this.collection = collection;
        this.client = new mongodb_1.MongoClient('mongodb+srv://vagner:knedlik110507@server-super-admin.wmlhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log("Mongo connected correctly to server");
                const db = this.client.db(this.cluster);
                return db.collection(this.collection);
            }
            catch (err) {
                console.log(err.stack);
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.connection();
            return col.find();
        });
    }
    findOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.connection();
            return col.findOne();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    }
}
exports.usersDB = new UseMongo(types_1.Clusters.ServerSuperAdmin, types_1.Collections.Users);
exports.settingsDB = new UseMongo(types_1.Clusters.ServerSuperAdmin, types_1.Collections.Settings);
//# sourceMappingURL=useMongo.js.map