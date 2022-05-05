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
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield useDataBase_1.useSuperAdmin.find(types_1.Collections.Users);
        res.json(yield users.toArray());
    }
    catch (error) {
        console.dir(error);
        res.status(500).json({ error, message: error.message });
    }
    finally {
        yield useDataBase_1.useSuperAdmin.close();
    }
}));
// router.get("/profile", async (req: ProfileRequest, res) => {
//   try {
//     if (req.query.userId === "new") {
//       await useUsersDB.createDB();
//       res.json('useUsersDB has been created')
//     }
//   } catch (err) {
//     console.dir(err);
//   } finally {
//     await useUsersDB.close();
//   }
// });
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