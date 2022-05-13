"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ValidationError = void 0;
const mongodb_1 = require("mongodb");
class ValidationError extends Error {
    constructor(message, field) {
        super();
        this.message = message;
        this.field = field;
    }
}
exports.ValidationError = ValidationError;
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: true,
            message: error.message,
            field: error.field
        });
    }
    if (error instanceof mongodb_1.MongoAPIError) {
        return res.status(500).json({
            error: true,
            message: error.message,
        });
    }
    next(error);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map