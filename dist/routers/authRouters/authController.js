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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const types_1 = require("../../db/types");
const useDataBase_1 = require("../../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMiddleware_1 = require("../../middleware/errorMiddleware");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor(reqName, reqPassword, collectionName, db, res, next) {
        this.reqName = reqName;
        this.reqPassword = reqPassword;
        this.collectionName = collectionName;
        this.db = db;
        this.res = res;
        this.next = next;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectOwnersCollection();
            yield this.findOwner({ name: this.reqName });
            if (this.owner.ownerId) {
                yield this.ownerWithId(this.owner.ownerId);
            }
            if (!this.owner.ownerId) {
                yield this.ownerWithoutId();
            }
        });
    }
    connectOwnersCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.db.getCollection(this.collectionName);
                if (result)
                    this.ownersCollection = result;
            }
            catch (err) {
                this.next(err);
            }
        });
    }
    findOwner(filter, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ownersCollection.findOne(filter, { projection });
                if (!result) {
                    throw new errorMiddleware_1.FormErr("owner in not exist", null);
                }
                this.owner = result;
            }
            catch (err) {
                this.next(err);
            }
        });
    }
    createTokens(ownerId) {
        const accessToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.ACCESS_SECRET, {
            expiresIn: "2m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.REFRESH_SECRET, {
            expiresIn: "10m",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    updateOwner(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.ownersCollection.updateOne(filter, {
                    $set: update,
                });
            }
            catch (err) {
                this.next(err);
            }
        });
    }
    sendAccessTokenToCookie(accessToken) {
        this.res.cookie("accessToken", accessToken, {
            sameSite: true,
            httpOnly: true,
            maxAge: 10000,
        });
        this.res.cookie("ownerId", this.owner.ownerId, {
            sameSite: true,
            maxAge: 10000,
        });
    }
    ownerWithoutId() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = this.owner;
            if (password !== this.reqPassword) {
                throw new errorMiddleware_1.FormErr("incorrect no id", "password");
            }
            const uniqueId = (0, uuid_1.v4)();
            const { accessToken, refreshToken } = this.createTokens(uniqueId);
            const encryptedPassword = yield bcryptjs_1.default.hash(this.reqPassword, 10);
            yield this.updateOwner({ name }, {
                refreshToken,
                password: encryptedPassword,
                ownerId: uniqueId,
            });
            this.sendAccessTokenToCookie(accessToken);
            yield this.findOwner({ uniqueId }, { _id: 0, password: 0 });
            this.res.status(201).json(this.owner);
        });
    }
    ownerWithId(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bcryptjs_1.default.compareSync(this.reqPassword, this.owner.password)) {
                throw new errorMiddleware_1.FormErr("incorrect", "password");
            }
            const { accessToken, refreshToken } = this.createTokens(ownerId);
            yield this.updateOwner({ ownerId }, { refreshToken });
            this.sendAccessTokenToCookie(accessToken);
            yield this.findOwner({ ownerId }, { _id: 0, password: 0 });
            this.res.status(201).json(this.owner);
        });
    }
}
function authController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const controller = new AuthController(req.body.name, req.body.password, types_1.Collections.Owners, useDataBase_1.useSuperAdmin, res, next);
            yield controller.run();
        }
        catch (err) {
            next(err);
        }
        finally {
            yield useDataBase_1.useSuperAdmin.close();
        }
    });
}
exports.authController = authController;
//# sourceMappingURL=authController.js.map