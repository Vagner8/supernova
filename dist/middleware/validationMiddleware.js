"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = exports.ErrorName = void 0;
const errorMiddleware_1 = require("./errorMiddleware");
var ErrorName;
(function (ErrorName) {
    ErrorName["ValidationError"] = "Validation Error:";
})(ErrorName = exports.ErrorName || (exports.ErrorName = {}));
function validate(field, item, length) {
    const str = item.toString();
    if (str.length < length.min) {
        throw new errorMiddleware_1.ValidationError(`min ${field} is ${length.min} characters`, field);
    }
    if (str.length > length.max) {
        throw new errorMiddleware_1.ValidationError(`max ${field} is ${length.max} characters`, field);
    }
    switch (field) {
        case "email":
            if (!str.split("").includes("@")) {
                throw new errorMiddleware_1.ValidationError(`${field} is incorrect`, field);
            }
    }
}
function validationMiddleware() {
    return (req, res, next) => {
        if (!req.body)
            next();
        if (req.body.name)
            validate("name", req.body.name, { min: 1, max: 20 });
        if (req.body.email)
            validate("email", req.body.email, { min: 3, max: 30 });
        if (req.body.password)
            validate("password", req.body.password, { min: 6, max: 20 });
        next();
    };
}
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validationMiddleware.js.map