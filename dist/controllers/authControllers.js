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
exports.registrationPost = void 0;
const types_1 = require("./../db/types");
const useDataBase_1 = require("./../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const errorMiddleware_1 = require("./../middleware/errorMiddleware");
const uuid_1 = require("uuid");
const helpers_1 = require("./../tools/helpers");
function registrationPost(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, password } = req.body;
        try {
            const ownersCollection = yield useDataBase_1.useSuperAdmin.getCollection(types_1.Collections.Owners);
            const owner = yield ownersCollection.findOne({ name });
            if (!owner) {
                throw new errorMiddleware_1.ValidationError("Owner in not exist", "");
            }
            if (owner.name !== name) {
                throw new errorMiddleware_1.ValidationError("Incorrect Name or Password", "name");
            }
            if (!bcryptjs_1.default.compareSync(password, owner.password)) {
                throw new errorMiddleware_1.ValidationError("Incorrect Name or Password", "password");
            }
            if (owner.ownerId) {
                const token = (0, helpers_1.createToken)(owner.ownerId);
                res.cookie("jwt", token, {
                    sameSite: true,
                    httpOnly: true,
                    maxAge: helpers_1.maxAge * 1000,
                });
                return res.status(200).json({ name: owner.name, ownerId: owner.ownerId });
            }
            if (!owner.ownerId) {
                const ownerId = (0, uuid_1.v4)();
                const encryptPassword = yield bcryptjs_1.default.hash(password, 10);
                yield ownersCollection.updateOne({
                    name,
                }, {
                    $set: { ownerId, password: encryptPassword },
                });
                res
                    .status(201)
                    .json(yield ownersCollection.findOne({ name }, { projection: { _id: 0, password: 0 } }));
            }
        }
        catch (err) {
            next(err);
        }
        finally {
            yield useDataBase_1.useSuperAdmin.close();
        }
    });
}
exports.registrationPost = registrationPost;
//# sourceMappingURL=authControllers.js.map