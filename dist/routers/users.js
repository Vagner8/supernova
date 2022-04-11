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
const useMongo_1 = require("../db/useMongo");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cursor = yield useMongo_1.usersDB.find();
        const users = yield cursor.toArray();
        res.json(users);
    }
    catch (err) {
        console.error(req.query, err.message);
    }
    finally {
        yield useMongo_1.usersDB.close();
    }
}));
router.get('/profile?:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        const user = yield useMongo_1.usersDB.findOne(userId);
        res.json(user);
        yield useMongo_1.usersDB.close();
    }
    catch (err) {
        console.error(req.query, err.message);
    }
    finally {
        yield useMongo_1.usersDB.close();
    }
}));
router.post('/post', (req, res) => {
    console.log(req.body);
    res.json('ok');
});
// router.put('/put', (req, res) => {
// })
// router.delete('/delete', (req, res) => {
//     console.log(req.body)
// })
exports.default = router;
//# sourceMappingURL=users.js.map