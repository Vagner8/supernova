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
exports.accessMiddleware = void 0;
const types_1 = require("./../db/types");
const useDataBase_1 = require("./../db/useDataBase");
const errorMiddleware_1 = require("./errorMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UseToken_1 = require("./../UseToken");
const accessMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.headers.ownerid;
        if (ownerId === "idle" || !ownerId || Array.isArray(ownerId)) {
            throw new errorMiddleware_1.Err(403, "no ownerId header", true);
        }
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_SECRET, (err) => {
                if (err) {
                    throw new errorMiddleware_1.Err(403, "access token is expired", true);
                }
            });
        }
        if (!accessToken) {
            const ownersColl = yield useDataBase_1.superAdmin.connect(types_1.CollName.Owners);
            if (!ownersColl) {
                throw new errorMiddleware_1.Err(500, `no connection ${types_1.CollName.Owners}`, true);
            }
            const result = yield ownersColl.findOne({ ownerId }, { projection: { _id: 0, refreshToken: 1 } });
            if (!result) {
                throw new errorMiddleware_1.Err(500, "no refreshToken", true);
            }
            jsonwebtoken_1.default.verify(result.refreshToken, process.env.REFRESH_SECRET, (err) => {
                if (err) {
                    throw new errorMiddleware_1.Err(403, "refresh token is expired", true);
                }
                const useToken = new UseToken_1.UseToken(res);
                useToken.createAccessToken(ownerId);
            });
        }
    }
    catch (err) {
        next(err);
    }
    finally {
        console.log("finally");
        yield useDataBase_1.superAdmin.close();
        next();
    }
});
exports.accessMiddleware = accessMiddleware;
//# sourceMappingURL=accessMiddleware.js.map