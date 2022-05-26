"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getOwnerController_1 = require("./getOwnerController");
const router = express_1.default.Router();
router.get("/", getOwnerController_1.getOwnerController);
exports.default = router;
//# sourceMappingURL=ownerRouters.js.map