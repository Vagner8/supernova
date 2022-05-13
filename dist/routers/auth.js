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
const express_1 = __importDefault(require("express"));
const types_1 = require("./../db/types");
const useDataBase_1 = require("./../db/useDataBase");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post("/registration", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const collection = yield useDataBase_1.useSuperAdmin.getCollection(types_1.Collections.Owners);
    const owner = yield collection.findOne({ email });
    if (owner) {
        return res.status(409).send('Owner already exist. Please login');
    }
    const encryptedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newOwner = collection.insertOne({
        name,
        email,
        encryptedPassword
    });
    res.json(owner);
}));
router.post("/login", (req, res) => {
});
exports.default = router;
//# sourceMappingURL=auth.js.map