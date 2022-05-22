"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const usersRouters_1 = __importDefault(require("./routers/usersRouters/usersRouters"));
const authRouters_1 = __importDefault(require("./routers/authRouters/authRouters"));
const ownerRouters_1 = __importDefault(require("./routers/ownerRouters/ownerRouters"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const validationMiddleware_1 = require("./middleware/validationMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const accessMiddleware_1 = require("./middleware/accessMiddleware");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, validationMiddleware_1.validationMiddleware)());
app.use("/auth", authRouters_1.default);
app.use((0, accessMiddleware_1.accessMiddleware)());
app.use("/users", usersRouters_1.default);
app.use("/owner", ownerRouters_1.default);
app.use(errorMiddleware_1.errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server has been started on port ${process.env.PORT}`);
});
//# sourceMappingURL=app.js.map