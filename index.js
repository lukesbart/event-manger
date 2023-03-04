"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { v4: uuidv4 } = require('uuid');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/assets", express_1.default.static('assets'));
const event = require("./routes/event.route");
app.use("/event", event);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/uuid', (req, res) => {
    res.send(uuidv4());
});
app.get('/uuid/:prefix/:ftype', (req, res) => {
    res.send(`${req.params.prefix}-${uuidv4()}.${req.params.ftype}`);
});
app.listen(port, () => {
    console.log(`event-manager is running at http://localhost:${port}`);
});
