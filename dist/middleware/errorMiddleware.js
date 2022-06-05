"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.Err = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var Err = /** @class */ (function (_super) {
    __extends(Err, _super);
    function Err(obj) {
        var _this = _super.call(this) || this;
        _this.obj = obj;
        return _this;
    }
    return Err;
}(Error));
exports.Err = Err;
function errorMiddleware(error, req, res, next) {
    if (error instanceof Err) {
        return res.status(error.obj.status).json(error.obj);
    }
    if (error instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(403).json({
            status: 403,
            message: "token is expired",
            field: null,
            logout: true,
        });
    }
    next(error);
}
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map