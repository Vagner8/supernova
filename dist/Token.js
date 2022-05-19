"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UseToken {
    constructor(res, ownerId) {
        this.res = res;
        this.ownerId = ownerId;
    }
    createAccessToken() {
        return jsonwebtoken_1.default.sign({ id: this.ownerId }, process.env.ACCESS_SECRET, {
            expiresIn: "10sec",
        });
    }
    createRefreshToken() {
        return jsonwebtoken_1.default.sign({ id: this.ownerId }, process.env.ACCESS_SECRET, {
            expiresIn: "20sec",
        });
    }
    sendAccessTokenToCookie() {
        this.res.cookie('accessToken', this.createRefreshToken()), {
            sameSite: true,
            httpOnly: true,
            maxAge: 10 * 1000,
        };
    }
}
exports.UseToken = UseToken;
//# sourceMappingURL=Token.js.map