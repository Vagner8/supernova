"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
require("dotenv/config");
const userName = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
exports.url = `mongodb+srv://${userName}:${password}@server-super-admin.wmlhf.mongodb.net/super-admin?retryWrites=true&w=majority`;
//# sourceMappingURL=dbSettings.js.map