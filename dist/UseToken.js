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
exports.UseToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UseToken {
    constructor(req, res, collection) {
        this.req = req;
        this.res = res;
        this.collection = collection;
    }
    createAccessToken(ownerId) {
        const accessToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.ACCESS_SECRET, {
            expiresIn: "10sec",
        });
        this.res.cookie("accessToken", accessToken, {
            sameSite: "lax",
            httpOnly: true,
            maxAge: 10 * 1000,
        });
    }
    createRefreshToken(ownerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshToken = jsonwebtoken_1.default.sign({ ownerId }, process.env.REFRESH_SECRET, {
                expiresIn: "60s",
            });
            yield this.collection.updateOne({ ownerId }, { $set: { refreshToken } });
        });
    }
    checkAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    checkRefreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.UseToken = UseToken;
//# sourceMappingURL=UseToken.js.map