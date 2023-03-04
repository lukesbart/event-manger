import { Request, Response } from "express";

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

router.use((req: Request, res: Response, next: any) => {
    console.log(`Request for: ${req.url}`);
    next();
});

// General endpoints

router.get('/', async (req: Request, res: Response) => {
    res.send(await eventController.getAll());
});

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    res.json(await eventController.createNewPost(req.body));
});

// Event specific endpoints

router.get('/:id', async (req: Request, res: Response) => {
    res.json(await eventController.getById(req.params.id));
});

router.put('/:id', async (req: Request, res: Response) => {
    res.json(await eventController.updateById(req.params.id, req.body));
})

router.delete('/:id', async (req: Request, res: Response) => {
    res.json(await eventController.deleteById(req.params.id));
})

// Temporary Endpoints

router.get('/:id/audio', async (req: Request, res: Response) => {
    res.json(await eventController.getAudioById(req.params.id));
});

router.get('/:id/video', async (req: Request, res: Response) => {
    res.json(await eventController.getVideoById(req.params.id));
})

module.exports = router;