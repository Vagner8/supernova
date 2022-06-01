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
const types_1 = require("../types");
const errorMiddleware_1 = require("./errorMiddleware");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UseToken_1 = require("./../UseToken");
const app_1 = require("./../app");
const accessMiddleware = () => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ownerId = req.headers.ownerid;
        if (ownerId === "idle" || !ownerId || Array.isArray(ownerId)) {
            throw new errorMiddleware_1.Err({
                status: 403,
                message: "no ownerId header",
                field: null,
                logout: true,
            });
        }
        const accessToken = req.cookies.accessToken;
        if (accessToken) {
            jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_SECRET, (err) => {
                if (err) {
                    throw new errorMiddleware_1.Err({
                        status: 403,
                        message: "access token is expired",
                        field: null,
                        logout: true,
                    });
                }
            });
        }
        if (!accessToken) {
            const ownersColl = app_1.db.collection(types_1.CollName.Owners);
            if (!ownersColl) {
                (0, app_1.restartServer)();
                throw new errorMiddleware_1.Err({
                    status: 500,
                    message: `no connection ${types_1.CollName.Owners}`,
                    field: null,
                    logout: true,
                });
            }
            const result = yield ownersColl.findOne({ ownerId }, { projection: { _id: 0, refreshToken: 1 } });
            if (!result) {
                throw new errorMiddleware_1.Err({
                    status: 500,
                    message: "no refreshToken",
                    field: null,
                    logout: true,
                });
            }
            jsonwebtoken_1.default.verify(result.refreshToken, process.env.REFRESH_SECRET, (err) => {
                if (err) {
                    throw new errorMiddleware_1.Err({
                        status: 403,
                        message: "refresh token is expired",
                        field: null,
                        logout: true,
                    });
                }
                new UseToken_1.UseToken(res).createAccessToken(ownerId);
            });
        }
    }
    catch (err) {
        next(err);
    }
    finally {
        next();
    }
});
exports.accessMiddleware = accessMiddleware;
//# sourceMappingURL=accessMiddleware.js.map