"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.Err = void 0;
class Err extends Error {
    constructor(obj) {
        super();
        this.obj = obj;
    }
}
exports.Err = Err;
function errorMiddleware(error, req, res, next) {
    if (error instanceof Err) {
        return res.status(error.obj.status).json(error.obj);
    }
    next(error);
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map