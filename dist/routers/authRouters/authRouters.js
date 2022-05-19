"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registrationController_1 = require("./registrationController");
const router = express_1.default.Router();
router.post("/registration", registrationController_1.registrationController);
exports.default = router;
//# sourceMappingURL=authRouters.js.map