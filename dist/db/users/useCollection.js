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
const mongodb_1 = require("mongodb");
// import { users } from "./mockData";
const settings_1 = require("../settings");
class UseCollection {
    constructor(cluster, collection) {
        this.cluster = cluster;
        this.collection = collection;
        this.client = new mongodb_1.MongoClient(settings_1.url);
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                const cluster = this.client.db(this.cluster);
                console.info(`Connected to collection: ${cluster.databaseName}`);
                const collection = cluster.collection(this.collection);
                console.info(`Connected to collection: ${collection.collectionName}`);
                return collection;
            }
            catch (err) {
                console.dir(err);
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const collection = yield this.run();
                return collection.find();
            }
            catch (err) {
                console.dir(err);
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
//# sourceMappingURL=useCollection.js.map