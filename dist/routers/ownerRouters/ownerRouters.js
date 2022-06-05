"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getOwner_1 = require("./controllers/getOwner");
var updateOwner_1 = require("./controllers/updateOwner");
var router = express_1.default.Router();
router.get("/", getOwner_1.getOwner);
router.put("/update", updateOwner_1.updateOwner);
exports.default = router;
//# sourceMappingURL=ownerRouters.js.map