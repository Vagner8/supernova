"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUsersController_1 = require("./getUsersController");
const router = express_1.default.Router();
router.get('/', getUsersController_1.getUsersController);
exports.default = router;
//# sourceMappingURL=usersRouters.js.map