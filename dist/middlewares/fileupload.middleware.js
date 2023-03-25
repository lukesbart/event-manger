"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const eventService = require("../services/event.service");
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
        cb(null, './assets');
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
function createUpload(customFileFilter) {
    return multer({
        storage: storage,
        fileFilter: customFileFilter,
        limits: {
            filesSize: 524288000,
            files: 3
        }
    });
}
function newPostFilter(req, file, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!("title" in req.body && "description" in req.body && "date" in req.body)) {
            return cb(new Error("Required fields not filled (title, body, date)"));
        }
        else if (yield eventService.checkIfTitleExists(req.body.title)) {
            return cb(new Error(`Title: ${req.body.title} already exists`));
        }
        else {
            // Figure out how to automatically include else branch
            if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
                cb(null, true);
            }
            else {
                cb(null, false);
                return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
            }
        }
    });
}
const newPostUpload = createUpload(newPostFilter);
module.exports = { upload, createUpload, newPostUpload };
