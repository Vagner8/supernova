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
exports.registrationPost = void 0;
const types_1 = require("../../db/types");
const useDataBase_1 = require("../../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMiddleware_1 = require("../../middleware/errorMiddleware");
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkOwner = (owner, reqName, reqPassword) => {
    if (!owner) {
        throw new errorMiddleware_1.ValidationError("owner in not exist", null);
    }
    if (owner.name !== reqName) {
        throw new errorMiddleware_1.ValidationError("incorrect", "name");
    }
    if (owner.ownerId && bcryptjs_1.default.compareSync(reqPassword, owner.password)) {
        return owner;
    }
    if (!owner.ownerId && reqPassword === owner.password) {
        return owner;
    }
    throw new errorMiddleware_1.ValidationError("incorrect", "password");
};
const withOwnerId = (owner, res) => {
    res.status(200).json({ name: owner.name, ownerId: owner.ownerId });
    return;
};
const setTokens = (ownerId) => {
    const accessToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.ACCESS, {
        expiresIn: "2m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.REFRESH, {
        expiresIn: "10m",
    });
    return {
        accessToken,
        refreshToken,
    };
};
const noOwnerId = (checkedOwner, res, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = checkedOwner;
    const ownerId = (0, uuid_1.v4)();
    const encryptPassword = yield bcryptjs_1.default.hash(password, 10);
    const { refreshToken, accessToken } = setTokens(ownerId);
    const result = yield collection.updateOne({ name }, { $set: { ownerId, password: encryptPassword, refreshToken } });
    const owner = yield collection.findOne({ name });
    if (!owner)
        throw new mongodb_1.MongoAPIError(`${name} is not exist`);
    if (!owner.ownerId)
        throw new mongodb_1.MongoAPIError(`${name} no has ownerId`);
    res.cookie("jwt", accessToken, {
        sameSite: true,
        httpOnly: true,
        maxAge: 60 * 1000 * 2,
    });
    res
        .status(201)
        .json(yield collection.findOne({ name }, { projection: { _id: 0, password: 0 } }));
});
function registrationPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        console.log(req.cookies);
        try {
            const ownersColl = yield useDataBase_1.useSuperAdmin.getCollection(types_1.Collections.Owners);
            if (!ownersColl)
                throw new mongodb_1.MongoAPIError("bad connection");
            const owner = yield ownersColl.findOne({ name });
            const checkedOwner = checkOwner(owner, name, password);
            if (checkedOwner.ownerId)
                withOwnerId(checkedOwner, res);
            if (!checkedOwner.ownerId)
                yield noOwnerId(checkedOwner, res, ownersColl);
        }
        catch (err) {
            next(err);
        }
        finally {
            yield useDataBase_1.useSuperAdmin.close();
        }
    });
}
exports.registrationPost = registrationPost;
//# sourceMappingURL=authControllers.js.map