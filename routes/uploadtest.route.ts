import { Request, Response } from "express";

const express = require("express");
const router = express.Router();

const fileUpload = require("../middlewares/fileupload.middleware");

router.use((req: Request, res: Response, next: any) => {
    console.log(`Request for: ${req.url}`);
    next();
});

function authenticate(req: Request, res: Response, next: any) {
    if (req.headers.auth === "trustmebro") {
        next();
    } else {
        res.status(401);
        res.send("Forbidden Request")
    }
}

router.get('/', (req: Request, res: Response) => {
    res.send("GET upload works!");
});

router.post('/', fileUpload.upload.single('file'), (req: Request, res: Response, next: any) => {
    console.log(req.file);
    console.log(req.file?.mimetype === 'application/pdf');
    res.send("File uploaded.");
});

router.post('/auth', authenticate, fileUpload.upload.single('file'), (req: Request, res: Response, next: any) => {
    res.send(`${req.file?.originalname} uploaded successfully`);
});

const assetsUpload = fileUpload.upload.fields([{name: 'mp4', maxCount:1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.post('/auth/mult', authenticate, assetsUpload, (req: Request, res: Response, next: any) => {
    
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

function fileFilter(req: Request, file: any, cb: any) {
    // Text fields have to come before files for this to work
    if (!("field" in req.body)) {
        return cb(new Error("Required fields not filled"));
    } else {
        if (file.mimetype == "application/pdf" || file.mimetype == "video/mp4" || file.mimetype == "audio/mpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only .pdf, .mp4, .mp3 format allowed'));
        }
    }
}
const customUpload = fileUpload.createUpload(fileFilter);

const fileUploader = customUpload.fields([{name: 'mp4', maxCount:1}, {name: 'mp3', maxCount: 1}]);
router.post('/single', fileUploader, (req: Request, res: Response, next: any) => {
    res.send("Please work");
});

module.exports = router;