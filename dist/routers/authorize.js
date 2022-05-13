"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/registration", (req, res) => {
    console.log(req.body);
    res.json("Hello");
});
exports.default = router;
//# sourceMappingURL=authorize.js.map