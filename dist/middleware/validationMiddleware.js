"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const errorMiddleware_1 = require("./errorMiddleware");
function validate(errorField, item, length) {
    const str = item.toString();
    if (str.length < length.min) {
        throw new errorMiddleware_1.Err({
            status: 400,
            message: `min ${length.min} characters`,
            logout: false,
            field: errorField
        });
    }
    if (str.length > length.max) {
        throw new errorMiddleware_1.Err({
            status: 400,
            message: `max ${length.max} characters`,
            logout: false,
            field: errorField
        });
    }
    switch (errorField) {
        case "email":
            if (!str.split("").includes("@")) {
                throw new errorMiddleware_1.Err({
                    status: 400,
                    message: `incorrect ${errorField}`,
                    logout: false,
                    field: errorField
                });
            }
    }
}
function validationMiddleware() {
    return (req, res, next) => {
        if (!req.body)
            next();
        if (req.body.login)
            validate("login", req.body.login, { min: 1, max: 20 });
        if (req.body.email)
            validate("email", req.body.email, { min: 3, max: 30 });
        if (req.body.password)
            validate("password", req.body.password, { min: 6, max: 20 });
        next();
    };
}
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map