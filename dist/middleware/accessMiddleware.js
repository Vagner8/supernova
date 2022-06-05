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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessMiddleware = exports.OWNER_ID = void 0;
var types_1 = require("../types");
var errorMiddleware_1 = require("./errorMiddleware");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var UseToken_1 = require("./../UseToken");
var app_1 = require("./../app");
var connectMongo_1 = require("./connectMongo");
var accessMiddleware = function () { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ownerId_1, accessToken, ownersColl, result, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                ownerId_1 = req.headers.ownerid;
                if (ownerId_1 === "idle" || !ownerId_1 || Array.isArray(ownerId_1)) {
                    throw new errorMiddleware_1.Err({
                        status: 403,
                        message: "no ownerId header",
                        field: null,
                        logout: true,
                    });
                }
                accessToken = req.cookies.accessToken;
                if (accessToken) {
                    jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_SECRET, function (err, decoded) {
                        if (err)
                            return next(err);
                        exports.OWNER_ID = decoded.ownerId;
                    });
                }
                if (!!accessToken) return [3 /*break*/, 2];
                ownersColl = connectMongo_1.MONGO_DB.collection(types_1.CollName.Owners);
                if (!ownersColl) {
                    (0, app_1.restartServer)();
                    throw new errorMiddleware_1.Err({
                        status: 500,
                        message: "no connection ".concat(types_1.CollName.Owners),
                        field: null,
                        logout: true,
                    });
                }
                return [4 /*yield*/, ownersColl.findOne({ ownerId: ownerId_1 }, { projection: { _id: 0, refreshToken: 1 } })];
            case 1:
                result = _a.sent();
                if (!result) {
                    throw new errorMiddleware_1.Err({
                        status: 500,
                        message: "no refreshToken",
                        field: null,
                        logout: true,
                    });
                }
                jsonwebtoken_1.default.verify(result.refreshToken, process.env.REFRESH_SECRET, function (err, decoded) {
                    if (err)
                        return next(err);
                    exports.OWNER_ID = decoded.ownerId;
                    new UseToken_1.UseToken(res).createAccessToken(ownerId_1);
                });
                _a.label = 2;
            case 2:
                next();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }; };
exports.accessMiddleware = accessMiddleware;
//# sourceMappingURL=accessMiddleware.js.map