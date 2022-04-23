"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
function throwError(where, what) {
    throw new Error(`in ${where}, caused by ${what}`);
}
exports.throwError = throwError;
//# sourceMappingURL=errorHandlers.js.map