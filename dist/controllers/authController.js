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
const types_1 = require("../db/types");
const useDataBase_1 = require("../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMiddleware_1 = require("../middleware/errorMiddleware");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["BadConnection"] = "bad connection";
    ErrorMessage["NotFound"] = "not found";
})(ErrorMessage || (ErrorMessage = {}));
class AuthController {
    constructor(reqName, reqPassword, collectionName, db, res) {
        this.reqName = reqName;
        this.reqPassword = reqPassword;
        this.collectionName = collectionName;
        this.db = db;
        this.res = res;
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connectOwnersCollection();
            yield this.getOldOwner();
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
            const { name } = this.connectOwnersCollection;
            try {
                const result = yield this.db.getCollection(this.collectionName);
                if (!result) {
                    throw new mongodb_1.MongoAPIError(`${name}, ${ErrorMessage.BadConnection}`);
                }
                this.ownersCollection = result;
            }
            catch (err) {
                throw new mongodb_1.MongoAPIError(`${name}, ${err}`);
            }
        });
    }
    getOldOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = this.getOldOwner;
            try {
                const result = yield this.ownersCollection.findOne({
                    name: this.reqName,
                });
                if (!result) {
                    throw new errorMiddleware_1.ValidationError("owner in not exist", null);
                }
                this.owner = result;
            }
            catch (err) {
                throw new mongodb_1.MongoAPIError(`${name}, ${err}`);
            }
        });
    }
    createTokens(ownerId) {
        const accessToken = jsonwebtoken_1.default.sign({ ownerId: ownerId }, process.env.ACCESS, {
            expiresIn: "2m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ ownerId: ownerId }, process.env.REFRESH, {
            expiresIn: "10m",
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    updateOwner(filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = this.updateOwner;
            try {
                const result = yield this.ownersCollection.updateOne(filter, {
                    $set: update,
                });
                console.log(result);
            }
            catch (err) {
                throw new mongodb_1.MongoAPIError(`${name}, ${err}`);
            }
        });
    }
    saveAccessTokenInCookie(accessToken) {
        this.res.cookie("jwt", accessToken, {
            sameSite: true,
            httpOnly: true,
            maxAge: 60 * 1000 * 2,
        });
    }
    getOwnerByOwnerId(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ownersCollection.findOne({ ownerId });
        });
    }
    ownerWithoutId() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = this.owner;
            if (password !== this.reqPassword) {
                throw new errorMiddleware_1.ValidationError("incorrect no id", "password");
            }
            const uniqueId = (0, uuid_1.v4)();
            const { accessToken, refreshToken } = this.createTokens(uniqueId);
            const encryptedPassword = yield bcryptjs_1.default.hash(this.reqPassword, 10);
            yield this.updateOwner({ name }, {
                refreshToken,
                password: encryptedPassword,
                ownerId: uniqueId,
            });
            this.saveAccessTokenInCookie(accessToken);
            this.res.status(201).json(yield this.getOwnerByOwnerId(uniqueId));
        });
    }
    ownerWithId(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!bcryptjs_1.default.compareSync(this.reqPassword, this.owner.password)) {
                throw new errorMiddleware_1.ValidationError("incorrect", "password");
            }
            const { accessToken, refreshToken } = this.createTokens(ownerId);
            yield this.updateOwner({ ownerId }, { refreshToken });
            this.saveAccessTokenInCookie(accessToken);
            this.res.status(201).json(yield this.getOwnerByOwnerId(ownerId));
        });
    }
}
function authController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const controller = new AuthController(req.body.name, req.body.password, types_1.Collections.Owners, useDataBase_1.useSuperAdmin, res);
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