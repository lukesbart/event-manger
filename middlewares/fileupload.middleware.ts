import { Request } from "express";

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

function fileFilter(req: Request, file: any, cb: any) {
    if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
    }
}

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        cb(null, './tempassets');
    },
    filename: function (req: Request, file: any, cb: any) {
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

module.exports = {upload};