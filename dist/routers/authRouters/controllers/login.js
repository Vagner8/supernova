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
exports.login = void 0;
var types_1 = require("../../../types");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var errorMiddleware_1 = require("../../../middleware/errorMiddleware");
var uuid_1 = require("uuid");
var UseToken_1 = require("../../../UseToken");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var app_1 = require("../../../app");
var connectMongo_1 = require("./../../../middleware/connectMongo");
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, login, password, ownersColl, useToken, owner, encryptedPassword, uniqueId, refreshToken, result, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, login = _a.login, password = _a.password;
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    ownersColl = connectMongo_1.MONGO_DB.collection(types_1.CollName.Owners);
                    if (!ownersColl) {
                        (0, app_1.restartServer)();
                        throw new errorMiddleware_1.Err({
                            status: 500,
                            message: "no connection",
                            field: null,
                            logout: false,
                        });
                    }
                    useToken = new UseToken_1.UseToken(res, ownersColl);
                    return [4 /*yield*/, ownersColl.findOne({ login: login })];
                case 2:
                    owner = _b.sent();
                    if (!owner) {
                        throw new errorMiddleware_1.Err({
                            status: 403,
                            message: "".concat(login, " not exist"),
                            field: "login",
                            logout: false,
                        });
                    }
                    if (!owner.ownerId) return [3 /*break*/, 4];
                    if (!bcryptjs_1.default.compareSync(password, owner.password)) {
                        throw new errorMiddleware_1.Err({
                            status: 400,
                            message: "incorrect",
                            field: "password",
                            logout: false,
                        });
                    }
                    useToken.createAccessToken(owner.ownerId);
                    return [4 /*yield*/, useToken.createRefreshToken(owner.ownerId)];
                case 3:
                    _b.sent();
                    res.status(201).json({ ownerId: owner.ownerId });
                    _b.label = 4;
                case 4:
                    if (!!owner.ownerId) return [3 /*break*/, 7];
                    if (password !== owner.password) {
                        throw new errorMiddleware_1.Err({
                            status: 400,
                            message: "incorrect",
                            field: "password",
                            logout: false,
                        });
                    }
                    return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                case 5:
                    encryptedPassword = _b.sent();
                    uniqueId = (0, uuid_1.v4)();
                    refreshToken = jsonwebtoken_1.default.sign({ ownerId: uniqueId }, process.env.REFRESH_SECRET);
                    return [4 /*yield*/, ownersColl.updateOne({ login: login }, {
                            $set: {
                                refreshToken: refreshToken,
                                ownerId: uniqueId,
                                password: encryptedPassword,
                            },
                        })];
                case 6:
                    result = _b.sent();
                    useToken.createAccessToken(uniqueId);
                    res.status(201).json({ ownerId: uniqueId });
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    next(err_1);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
//# sourceMappingURL=login.js.map