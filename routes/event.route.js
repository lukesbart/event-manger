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
const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const fileUpload = require("../middlewares/fileupload.middleware");
router.use((req, res, next) => {
    console.log(`Request for: ${req.url}`);
    next();
});
// General endpoints
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield eventController.getAll());
}));
function newPostFilter(req, file, cb) {
    if (!("title" in req.body && "description" in req.body && "date" in req.body)) {
        return cb(new Error("Required fields not filled (title, body, date)"));
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
}
const newPostUpload = fileUpload.createUpload(newPostFilter);
const assetsUpload = newPostUpload.fields([{ name: 'mp4', maxCount: 1 }, { name: 'mp3', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]);
router.post('/', assetsUpload, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        res.status(400);
        res.send("No files uploaded");
    }
    let filesJSON = JSON.stringify(req.files);
    let filesOBJ = JSON.parse(filesJSON);
    let mp3Route = filesOBJ["mp3"][0]["filename"];
    let mp4Route = filesOBJ["mp4"][0]["filename"];
    let pdfRoute = filesOBJ["pdf"][0]["filename"];
    let uploadOBJ = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        audio_url: mp3Route,
        video_url: mp4Route,
        handout_url: pdfRoute
    };
    res.json(yield eventController.createNewPost(uploadOBJ));
}));
// Event specific endpoints
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.getById(req.params.id));
}));
const updateUpload = fileUpload.upload.fields([{ name: 'mp4', maxCount: 1 }, { name: 'mp3', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]);
router.put('/:id', updateUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mp3Route, mp4Route, pdfRoute;
    if (req.files) {
        let filesJSON = JSON.stringify(req.files);
        let filesOBJ = JSON.parse(filesJSON);
        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : undefined;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : undefined;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : undefined;
    }
    let updateOBJ = {
        id: parseInt(req.params.id),
        title: req.body.title ? req.body.title : undefined,
        description: req.body.description ? req.body.description : undefined,
        date: req.body.date ? req.body.date : undefined,
        audio_url: req.files ? mp3Route : undefined,
        video_url: req.files ? mp4Route : undefined,
        handout_url: req.files ? pdfRoute : undefined,
    };
    res.json(yield eventController.updateById(updateOBJ));
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield eventController.deleteById(req.params.id));
}));
module.exports = router;
