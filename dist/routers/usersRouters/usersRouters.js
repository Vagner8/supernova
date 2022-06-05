"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getUsersController_1 = require("./getUsersController");
var router = express_1.default.Router();
router.get('/', getUsersController_1.getUsersController);
exports.default = router;
//# sourceMappingURL=usersRouters.js.map