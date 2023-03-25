import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const fileUpload = require("../middlewares/fileupload.middleware");
import { UploadDTO } from "../interfaces/uploadDTO"
import { UpdateDTO } from "../interfaces/updateDTO"
import { ResponseOBJ } from "../interfaces/responseObj"
const jwtMiddleware = require('../middlewares/jwt.middleware');

// General endpoints

router.get('/', async (req: Request, res: Response) => {
    res.send(await eventController.getAll());
});


const assetsUpload = fileUpload.newPostUpload.fields([{name: 'mp4', maxCount: 1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.post('/', jwtMiddleware.jwtAuthenticate, assetsUpload, async (req: Request, res: Response) => {
    let mp3Route, mp4Route, pdfRoute;

    if (req.files) {
        const filesJSON = JSON.stringify(req.files);
        const filesOBJ = JSON.parse(filesJSON);

        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : null;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : null;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : null;
    }

    const uploadOBJ: UploadDTO = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        audio_url: mp3Route,
        video_url: mp4Route,
        handout_url: pdfRoute
    }

    const createResponse: ResponseOBJ = await eventController.createNewPost(uploadOBJ);

    if (createResponse.errorCode) {
        res.status(400);
        return res.json(createResponse.errorMessage)
    }

    res.json(createResponse);
});

// Event specific endpoints

router.get('/:id', async (req: Request, res: Response) => {
    const findResponse: ResponseOBJ = await eventController.getById(req.params.id)
    if (findResponse.errorCode) {
        res.status(404);
        return res.json(findResponse.errorMessage);
    }

    res.json(findResponse.data);
});

const updateUpload = fileUpload.upload.fields([{name: 'mp4', maxCount:1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.patch('/:id', jwtMiddleware.jwtAuthenticate, updateUpload, async (req: Request, res: Response) => {
    
    let mp3Route, mp4Route, pdfRoute;
    if (req.files) {
        const filesJSON = JSON.stringify(req.files);
        const filesOBJ = JSON.parse(filesJSON);
        
        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : undefined;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : undefined;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : undefined;
    }

    const updateOBJ : UpdateDTO = {
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

const replaceUpload = fileUpload.newPostUpload.fields([{name: 'mp4', maxCount: 1}, {name: 'mp3', maxCount: 1}, {name: 'pdf', maxCount: 1}]);
router.put('/:id', jwtMiddleware.jwtAuthenticate, replaceUpload, async (req: Request, res: Response) => {
    let mp3Route, mp4Route, pdfRoute;
    if (req.files) {
        const filesJSON = JSON.stringify(req.files);
        const filesOBJ = JSON.parse(filesJSON);

        mp3Route = filesOBJ["mp3"] ? filesOBJ["mp3"][0]["filename"] : undefined;
        mp4Route = filesOBJ["mp4"] ? filesOBJ["mp4"][0]["filename"] : undefined;
        pdfRoute = filesOBJ["pdf"] ? filesOBJ["pdf"][0]["filename"] : undefined;
    }

    const replaceOBJ : UpdateDTO = {
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

router.delete('/:id', jwtMiddleware.jwtAuthenticate, async (req: Request, res: Response) => {
    res.json(await eventController.deleteById(req.params.id));
})

module.exports = router;