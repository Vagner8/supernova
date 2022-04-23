"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url = void 0;
const userName = encodeURIComponent("vagner");
const password = encodeURIComponent("knedlik110507");
const clusterUrl = "server-super-admin.wmlhf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const authMechanism = "DEFAULT";
exports.url = `mongodb+srv://${userName}:${password}@${clusterUrl}/?authMechanism=${authMechanism}`;
//# sourceMappingURL=settings.js.map