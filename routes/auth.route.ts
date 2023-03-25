import { NextFunction, Request, Response } from 'express';

const express = require('express')
const router = express.Router();
// const userController = require('../controllers/user.controller')
const userService = require("../services/user.service")
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../middlewares/jwt.middleware');


async function authenticate(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.user) {
        res.status(403);
        res.send("No username or password provided");
    } else if (await userService.validateUser(req.headers.user, req.headers.password)) {
        next()
    } else {
        res.status(403);
        res.send("Invalid username or password");
    }
}

function jwtAuthenticate(req: Request, res: Response) {
    console.log(req.headers.auth)
    let decoded;
    try {
        decoded = jwt.verify(req.headers.auth, process.env.SECRET_KEY);
    } catch(err: any) {
        console.log(req.headers.auth)
        res.status(403);
        res.send(err.message)
    }

    res.send(decoded.user);
}

interface LoginObject {
    token: string,
    ttl: string,
}

router.post('/login', authenticate, (req: Request, res: Response) => {
    const token = jwt.sign({user: 'lukesb'}, process.env.SECRET_KEY, { expiresIn: `20m` });

    const newLogin: LoginObject = {
        token: token,
        ttl: String(Date.now() + 1000 * 60 * 20),
    }

    res.json(newLogin);
})

router.post('/verify', (req: Request, res: Response) => {
    const token = req.headers.token;

    if(jwtMiddleware.verifyToken(token)) {
        res.status(200);
        res.send("Verified");
    } else {
        res.status(401);
        res.send("Invalid Token");
    }
})

router.get('/', jwtAuthenticate)

module.exports = router;