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
exports.getOwnerController = void 0;
const useDataBase_1 = require("./../../db/useDataBase");
const types_1 = require("./../../db/types");
const errorMiddleware_1 = require("./../../middleware/errorMiddleware");
function getOwnerController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const funcName = getOwnerController.name;
        try {
            const ownerId = req.query.ownerId;
            if (!ownerId) {
                throw new errorMiddleware_1.Err({
                    status: 403,
                    text: `no ownerId: ${funcName}`,
                    field: null,
                    logout: false,
                });
            }
            const ownersColl = yield useDataBase_1.superAdmin.connect(types_1.CollName.Owners);
            if (!ownersColl) {
                throw new errorMiddleware_1.Err({
                    status: 500,
                    text: `no connection: ${funcName}`,
                    field: null,
                    logout: false,
                });
            }
            const owner = yield ownersColl.findOne({ ownerId }, {
                projection: {
                    _id: 0,
                    ownerId: 0,
                    password: 0,
                    refreshToken: 0,
                },
            });
            if (!owner) {
                throw new errorMiddleware_1.Err({
                    status: 500,
                    text: `owner no found: ${funcName}`,
                    field: null,
                    logout: false,
                });
            }
            res.status(200).json(owner);
        }
        catch (err) {
            next(err);
        }
        finally {
            yield useDataBase_1.superAdmin.close();
        }
    });
}
exports.getOwnerController = getOwnerController;
//# sourceMappingURL=getOwnerController.js.map