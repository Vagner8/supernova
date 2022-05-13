"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res, next) {
    res.json(error.message);
    next(error);
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=middleware.js.map