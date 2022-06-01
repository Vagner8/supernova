"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getOwner_1 = require("./controllers/getOwner");
const router = express_1.default.Router();
router.get("/", getOwner_1.getOwner);
exports.default = router;
//# sourceMappingURL=ownerRouters.js.map