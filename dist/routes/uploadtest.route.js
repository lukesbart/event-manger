"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const fileUpload = require("../middlewares/fileupload.middleware");
router.use((req, res, next) => {
    console.log(`Request for: ${req.url}`);
    next();
});
function authenticate(req, res, next) {
    if (req.headers.auth === "trustmebro") {
        next();
    }
    else {
        res.status(401);
        res.send("Forbidden Request");
    }
}
router.get('/', (req, res) => {
    res.send("GET upload works!");
});
router.post('/', fileUpload.upload.single('file'), (req, res, next) => {
    var _a;
    console.log(req.file);
    console.log(((_a = req.file) === null || _a === void 0 ? void 0 : _a.mimetype) === 'application/pdf');
    res.send("File uploaded.");
});
router.post('/auth', authenticate, fileUpload.upload.single('file'), (req, res, next) => {
    var _a;
    res.send(`${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname} uploaded successfully`);
});
const assetsUpload = fileUpload.upload.fields([{ name: 'mp4', maxCount: 1 }, { name: 'mp3', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]);
router.post('/auth/mult', authenticate, assetsUpload, (req, res, next) => {
    // Workaround for typescript's restriction on using these fields from the req.files object
    let filesJSON = JSON.stringify(req.files);
    let filesObj = JSON.parse(filesJSON);
    if ("mp3" in filesObj) {
        console.log(filesObj["mp3"][0]["filename"]);
    }
    if ("mp4" in filesObj) {
        console.log(filesObj["mp4"][0]["filename"]);
    }
    if ("pdf" in filesObj) {
        console.log(filesObj["pdf"][0]["filename"]);
    }
    res.send(`Assets uploaded successfully`);
});
function fileFilter(req, file, cb) {
    // Text fields have to come before files for this to work
    if (!("field" in req.body)) {
        return cb(new Error("Required fields not filled"));
    }
    else {
        if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
        }
    }
}
const customUpload = fileUpload.createUpload(fileFilter);
const fileUploader = customUpload.fields([{ name: 'mp4', maxCount: 1 }, { name: 'mp3', maxCount: 1 }]);
router.post('/single', fileUploader, (req, res, next) => {
    res.send("Please work");
});
module.exports = router;
