"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routers/users"));
const settings_1 = __importDefault(require("./routers/settings"));
// import path from 'path'
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// const publicPath = path.join(__dirname, '..', 'client', 'build')
// app.use(express.static(publicPath))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(publicPath, 'index.html'));
// })
app.use('/users', users_1.default);
app.use('/settings', settings_1.default);
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
});
//# sourceMappingURL=app.js.map