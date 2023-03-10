import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const fileUpload = require("../middlewares/fileupload.middleware");
import { UploadDTO } from "../interfaces/uploadDTO"
import { UpdateDTO } from "../interfaces/updateDTO"
const eventService = require("../services/event.service");
const userService = require("../services/user.service");

// General endpoints

function authenticate(req: Request, res: Response, next: any) {
    if (req.headers.auth === "trustmebro") {
        next();
    } else {
        res.status(403);
        res.send("Unauthorized")
    }
}

async function usrPwdAuth(req: Request, res: Response, next: any) {
    if (!req.headers.user) {
        res.status(403);
        res.send("Not signed in");
    } else if (await userService.validateUser(req.headers.user, req.headers.password)) {
        next();
    } else {
        res.status(403);
        res.send("Invalid username or password")
    }
}


router.get('/', async (req: Request, res: Response) => {
    res.send(await eventController.getAll());
});

async function newPostFilter(req: Request, file: any, cb: any) {
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
const newPostUpload = fileUpload.createUpload(newPostFilter);

const assetsUpload = newPostUpload.fields([{name: 'mp4', maxCount: 1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.post('/', authenticate, assetsUpload, async (req: Request, res: Response, next: any) => {
    let mp3Route, mp4Route, pdfRoute;

    if (req.files) {
        let filesJSON = JSON.stringify(req.files);
        let filesOBJ = JSON.parse(filesJSON);

        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : null;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : null;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : null;
    }

    let uploadOBJ: UploadDTO = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        audio_url: mp3Route,
        video_url: mp4Route,
        handout_url: pdfRoute
    }

    res.json(await eventController.createNewPost(uploadOBJ));
});

// Event specific endpoints

router.get('/:id', async (req: Request, res: Response) => {
    res.json(await eventController.getById(req.params.id));
});

const updateUpload = fileUpload.upload.fields([{name: 'mp4', maxCount:1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.patch('/:id', authenticate, updateUpload, async (req: Request, res: Response) => {
    
    let mp3Route, mp4Route, pdfRoute;
    if (req.files) {
        let filesJSON = JSON.stringify(req.files);
        let filesOBJ = JSON.parse(filesJSON);
        
        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : undefined;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : undefined;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : undefined;
    }

    let updateOBJ : UpdateDTO = {
        id: parseInt(req.params.id),
        title: req.body.title ? req.body.title : undefined,
        description: req.body.description ? req.body.description : undefined,
        date: req.body.date ? req.body.date : undefined,
        audio_url: req.files ? mp3Route : undefined,
        video_url: req.files ? mp4Route : undefined,
        handout_url: req.files ? pdfRoute : undefined,
    }

    res.json(await eventController.updateById(updateOBJ));
})

const replaceUpload = newPostUpload.fields([{name: 'mp4', maxCount: 1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.put('/:id', authenticate, replaceUpload, async (req: Request, res: Response) => {
    let mp3Route, mp4Route, pdfRoute;
    if (req.files) {
        let filesJSON = JSON.stringify(req.files);
        let filesOBJ = JSON.parse(filesJSON);

        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : undefined;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : undefined;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : undefined;
    }

    let replaceOBJ : UpdateDTO = {
        id: parseInt(req.params.id),
        title: req.body.title ? req.body.title : undefined,
        description: req.body.description ? req.body.description : undefined,
        date: req.body.date ? req.body.date : undefined,
        audio_url: req.files ? mp3Route : undefined,
        video_url: req.files ? mp4Route : undefined,
        handout_url: req.files ? pdfRoute : undefined,
    }

    res.json(await eventController.replaceByID(replaceOBJ));
});

router.delete('/:id', authenticate, async (req: Request, res: Response) => {
    res.json(await eventController.deleteById(req.params.id));
})

module.exports = router;