"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPoints = void 0;
function createPoints(user) {
    const { _id, name, surname, email, img, phone, address, registration, birth, disabled } = user;
    const points = [
        { name, surname },
        { birth, address },
        { registration, email, phone },
        { id: _id, img, disabled }
    ];
    return points;
}
exports.createPoints = createPoints;
//# sourceMappingURL=helpers.js.map