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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwner = void 0;
const app_1 = require("../../../app");
const types_1 = require("../../../types");
const errorMiddleware_1 = require("../../../middleware/errorMiddleware");
function getOwner(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ownerId = req.headers.ownerid;
            const projection = req.query.projection;
            if (!ownerId || !projection) {
                throw new errorMiddleware_1.Err({
                    status: 403,
                    message: "no ownerId or projection",
                    field: null,
                    logout: false,
                });
            }
            const ownersColl = app_1.db.collection(types_1.CollName.Owners);
            if (!ownersColl) {
                (0, app_1.restartServer)();
                throw new errorMiddleware_1.Err({
                    status: 500,
                    message: "no connection",
                    field: null,
                    logout: false,
                });
            }
            const owner = yield ownersColl.findOne({ ownerId }, { projection: JSON.parse(projection) });
            if (!owner) {
                throw new errorMiddleware_1.Err({
                    status: 500,
                    message: "owner no found",
                    field: null,
                    logout: false,
                });
            }
            res.status(200).json(owner);
        }
        catch (err) {
            next(err);
        }
    });
}
exports.getOwner = getOwner;
//# sourceMappingURL=getOwner.js.map