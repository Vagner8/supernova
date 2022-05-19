"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenMiddleware = void 0;
const tokenMiddleware = () => (req, res, next) => {
    console.log('tokenMiddleware');
    res.clearCookie('ownerId');
    next();
};
exports.tokenMiddleware = tokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map