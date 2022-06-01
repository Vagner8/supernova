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
exports.restartServer = exports.db = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const usersRouters_1 = __importDefault(require("./routers/usersRouters/usersRouters"));
const authRouters_1 = __importDefault(require("./routers/authRouters/authRouters"));
const ownerRouters_1 = __importDefault(require("./routers/ownerRouters/ownerRouters"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const validationMiddleware_1 = require("./middleware/validationMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const accessMiddleware_1 = require("./middleware/accessMiddleware");
const mongodb_1 = require("mongodb");
const settings_1 = require("./settings");
const types_1 = require("./types");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, validationMiddleware_1.validationMiddleware)());
app.use("/auth", authRouters_1.default);
app.use((0, accessMiddleware_1.accessMiddleware)());
app.use("/users", usersRouters_1.default);
app.use("/owner", ownerRouters_1.default);
app.use(errorMiddleware_1.errorMiddleware);
const restartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = new mongodb_1.MongoClient(settings_1.url);
    yield client.connect();
    exports.db = client.db(types_1.DataBase.SuperAdmin);
    app.listen(process.env.PORT, () => {
        console.log(`Server has been started on port ${process.env.PORT}`);
    });
});
exports.restartServer = restartServer;
(0, exports.restartServer)();
//# sourceMappingURL=app.js.map