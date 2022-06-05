"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
require("dotenv/config");
var password = encodeURIComponent(process.env.MONGO_PASSWORD);
exports.url = "mongodb+srv://vagner:".concat(password, "@supernova.1nqe9.mongodb.net/?retryWrites=true&w=majority");
//# sourceMappingURL=settings.js.map