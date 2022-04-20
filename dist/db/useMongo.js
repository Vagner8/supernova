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
const settings_1 = require("./settings");
const types_1 = require("./types");
class UseMongo {
    constructor(cluster, collection) {
        this.cluster = cluster;
        this.collection = collection;
        // public client = new MongoClient('mongodb+srv://vagner:knedlik110507@server-super-admin.wmlhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        this.client = new mongodb_1.MongoClient(settings_1.url);
        this.docs = [
            { stars: 3, categories: ["Bakery", "Sandwiches"], name: "Rising Sun Bakery" },
            { stars: 4, categories: ["Bakery", "Cafe", "Bar"], name: "Cafe au Late" },
            { stars: 5, categories: ["Coffee", "Bakery"], name: "Liz's Coffee Bar" },
            { stars: 3, categories: ["Steak", "Seafood"], name: "Oak Steakhouse" },
            { stars: 4, categories: ["Bakery", "Dessert"], name: "Petit Cookie" },
        ];
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const cluster = this.client.db(this.cluster);
                const collection = cluster.collection(this.collection);
                console.info(`Connected to collection: ${collection.collectionName}`);
                return collection;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.run();
            const pipeline = [
                { $match: { users: { name: "Arnold" } } },
                { $group: { _id: "$id", count: { $sum: 1 } } }
            ];
            return collection.aggregate(pipeline);
        });
    }
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const col = yield this.run();
            return col.findOne({ _id: new mongodb_1.ObjectId("6259e128bb9dfb1871c0983a") });
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