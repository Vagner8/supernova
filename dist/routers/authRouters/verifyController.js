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
exports.verifyController = void 0;
const useDataBase_1 = require("../../db/useDataBase");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const types_1 = require("./../../db/types");
const UseToken_1 = require("./../../UseToken");
function verifyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { ownerId } = req.body;
            const accessToken = req.cookies.accessToken;
            const ownersColl = yield useDataBase_1.superAdmin.connect(types_1.CollName.Owners);
            if (!ownersColl || !ownerId) {
                return res.status(401).json({ ownerId: null });
            }
            const useToken = new UseToken_1.UseToken(req, res, ownerId, ownersColl);
            if (accessToken) {
                jsonwebtoken_1.default.verify(req.cookies.accessToken, process.env.ACCESS_SECRET, (err, ownerId) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        yield useToken.checkRefreshToken();
                    }
                    res.status(200).json({ ownerId });
                }));
            }
            if (!accessToken) {
                yield useToken.checkRefreshToken();
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
exports.verifyController = verifyController;
//# sourceMappingURL=verifyController.js.map