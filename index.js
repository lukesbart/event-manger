"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan("tiny"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express_1.default.static('assets'));
app.use("/public", express_1.default.static('public'));
const event = require("./routes/event.route");
app.use("/event", event);
const uploadtest = require("./routes/uploadtest.route");
app.use("/upload", uploadtest);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`event-manager is running at http://localhost:${port}`);
});
