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
const morgan = require('morgan');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = uuidv4();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.pdf');
    }
});
const upload = multer({ dest: 'assets/', storage: storage });
const cors = require('cors');
app.use(morgan("tiny"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express_1.default.static('assets'));
app.use("/public", express_1.default.static('public'));
function authenticate(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'secret') {
        next();
    }
    else {
        res.status(401);
        res.send('Access forbidden');
    }
}
const event = require("./routes/event.route");
app.use("/event", event);
const uploadtest = require("./routes/uploadtest.route");
app.use("/upload", uploadtest);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/uuid', (req, res) => {
    res.send(uuidv4());
});
app.get('/uuid/:prefix', (req, res) => {
    let guid = uuidv4();
    ;
    let fileNamesObj = {
        mp3: `${req.params.prefix}-${guid}.mp3`,
        mp4: `${req.params.prefix}-${guid}.mp4`,
        pdf: `${req.params.prefix}-${guid}.pdf`,
    };
    res.json(fileNamesObj);
});
app.post('/pdf', authenticate, upload.single('pdffile'), (req, res, next) => {
    res.send("File uploaded.");
});
app.listen(port, () => {
    console.log(`event-manager is running at http://localhost:${port}`);
});
