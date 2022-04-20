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
const useCollection_1 = require("../db/useCollection");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('get users');
        const users = yield (yield useCollection_1.usersCollection.find()).toArray();
        // const users = await (await testCollection.find()).toArray();
        const dropList = yield (yield useCollection_1.dropListCollection.find()).toArray();
        res.json({ users, dropList });
    }
    catch (err) {
        console.dir(err);
    }
    finally {
        yield useCollection_1.usersCollection.close();
        yield useCollection_1.dropListCollection.close();
    }
}));
router.get('/?:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        console.log(userId);
    }
    catch (err) {
        console.dir(err);
    }
    finally {
    }
}));
// router.post('/post', (req, res) => {
//   console.log(req.body)
//   res.json('ok')
// })
// router.put('/put', (req, res) => {
// })
// router.delete('/delete', (req, res) => {
//     console.log(req.body)
// })
exports.default = router;
//# sourceMappingURL=users.js.map