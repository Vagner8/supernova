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
exports.registrationController = void 0;
const types_1 = require("../../db/types");
const useDataBase_1 = require("../../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMiddleware_1 = require("../../middleware/errorMiddleware");
const uuid_1 = require("uuid");
const UseToken_1 = require("./../../UseToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registrationController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const funcName = registrationController.name;
        const { login, password } = req.body;
        try {
            const ownersColl = yield useDataBase_1.superAdmin.connect(types_1.CollName.Owners);
            if (!ownersColl) {
                throw new errorMiddleware_1.Err({
                    status: 500,
                    message: `no connection: ${funcName}`,
                    field: null,
                    logout: false,
                });
            }
            const useToken = new UseToken_1.UseToken(res, ownersColl);
            const owner = yield ownersColl.findOne({ login });
            if (!owner) {
                throw new errorMiddleware_1.Err({
                    status: 403,
                    message: `${login} not exist`,
                    field: "login",
                    logout: false,
                });
            }
            if (owner.ownerId) {
                if (!bcryptjs_1.default.compareSync(password, owner.password)) {
                    throw new errorMiddleware_1.Err({
                        status: 400,
                        message: "incorrect",
                        field: "password",
                        logout: false,
                    });
                }
                useToken.createAccessToken(owner.ownerId);
                yield useToken.createRefreshToken(owner.ownerId);
                res.status(201).json({ ownerId: owner.ownerId });
            }
            if (!owner.ownerId) {
                if (password !== owner.password) {
                    throw new errorMiddleware_1.Err({
                        status: 400,
                        message: "incorrect",
                        field: "password",
                        logout: false,
                    });
                }
                const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
                const uniqueId = (0, uuid_1.v4)();
                const refreshToken = jsonwebtoken_1.default.sign({ ownerId: uniqueId }, process.env.REFRESH_SECRET);
                const result = yield ownersColl.updateOne({ login }, {
                    $set: {
                        refreshToken,
                        ownerId: uniqueId,
                        password: encryptedPassword,
                    },
                });
                useToken.createAccessToken(uniqueId);
                res.status(201).json({ ownerId: uniqueId });
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            yield useDataBase_1.superAdmin.close();
        }
    });
}
exports.registrationController = registrationController;
//# sourceMappingURL=registrationController.js.map