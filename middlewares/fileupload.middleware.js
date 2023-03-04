"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
function fileFilter(req, file, cb) {
    if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './tempassets');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 524288000,
        files: 3
    }
});
module.exports = { upload };
