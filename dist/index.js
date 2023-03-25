"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// Middleware
app.use(morgan("tiny"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors());
// Static Routes
app.use("/assets", express_1.default.static('assets'));
app.use("/public", express_1.default.static('public'));
app.use("/docs", express_1.default.static('docs/docs.json'));
// Dynamic Routes
const event = require("./routes/event.route");
app.use("/event", event);
const auth = require("./routes/auth.route");
app.use("/auth", auth);
app.get('/', (req, res) => {
    res.send('Welcome to Event Manager. To see events GET /event. To see docs GET /docs');
});
// App setup
app.listen(port, () => {
    console.log(`event-manager is running at http://localhost:${port}`);
});
