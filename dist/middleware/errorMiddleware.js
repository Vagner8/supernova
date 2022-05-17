"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ValidationError = void 0;
const mongodb_1 = require("mongodb");
class ValidationError extends Error {
    constructor(errorMessage, errorField) {
        super();
        this.errorMessage = errorMessage;
        this.errorField = errorField;
    }
}
exports.ValidationError = ValidationError;
const errorMiddleware = (error, req, res, next) => {
    console.log('errorMiddleware', 'errorMiddleware');
    if (error instanceof ValidationError) {
        return res.status(400).json({
            errorMessage: error.errorMessage,
            errorField: error.errorField,
        });
    }
    if (error instanceof mongodb_1.MongoAPIError) {
        return res.status(500).json({
            errorMessage: error.message,
        });
    }
    next(error);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map