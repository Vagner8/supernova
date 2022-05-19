"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.FormErr = exports.Err = void 0;
class Err extends Error {
    constructor(errorMessage, logout) {
        super();
        this.errorMessage = errorMessage;
        this.logout = logout;
    }
}
exports.Err = Err;
class FormErr extends Error {
    constructor(errorMessage, errorField) {
        super();
        this.errorMessage = errorMessage;
        this.errorField = errorField;
    }
}
exports.FormErr = FormErr;
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof FormErr) {
        return res.status(400).json({
            errorMessage: error.errorMessage,
            errorField: error.errorField,
        });
    }
    if (error instanceof Err) {
        return res.status(401).json({
            errorMessage: error.errorMessage,
            logout: error.logout
        });
    }
    next(error);
};
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map