"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const errorMiddleware_1 = require("./errorMiddleware");
const tokenMiddleware = () => (req, res, next) => {
    if (req.headers.ownerid === 'idle') {
        throw new errorMiddleware_1.Err(403, 'no ownerId header', true);
    }
    console.log(req.headers.ownerid);
    next();
};
exports.tokenMiddleware = tokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map