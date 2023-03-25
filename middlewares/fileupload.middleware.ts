// import { create } from "domain";
import { Request } from "express";
import { FileFilterCallback, Multer } from "multer";
const eventService = require("../services/event.service");

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
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        cb(null, './assets');
    },
    filename: function (req: Request, file: any, cb: FileFilterCallback) {
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

function createUpload(customFileFilter: any) {
    return multer({
        storage: storage,
        fileFilter: customFileFilter,
        limits: {
            filesSize: 524288000,
            files: 3
        }
    });
}

async function newPostFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
    if (!("title" in req.body && "description" in req.body && "date" in req.body)) {
        return cb(new Error("Required fields not filled (title, body, date)"));
    } else if (await eventService.checkIfTitleExists(req.body.title)) {
        return cb(new Error(`Title: ${req.body.title} already exists`));
    } else {
        // Figure out how to automatically include else branch
        if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
        }
    }
}

const newPostUpload = createUpload(newPostFilter);


module.exports = {upload, createUpload, newPostUpload};