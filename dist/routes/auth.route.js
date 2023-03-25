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
const express = require('express');
const router = express.Router();
// const userController = require('../controllers/user.controller')
const userService = require("../services/user.service");
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('../middlewares/jwt.middleware');
function authenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.user) {
            res.status(403);
            res.send("No username or password provided");
        }
        else if (yield userService.validateUser(req.headers.user, req.headers.password)) {
            next();
        }
        else {
            res.status(403);
            res.send("Invalid username or password");
        }
    });
}
function jwtAuthenticate(req, res) {
    console.log(req.headers.auth);
    let decoded;
    try {
        decoded = jwt.verify(req.headers.auth, process.env.SECRET_KEY);
    }
    catch (err) {
        console.log(req.headers.auth);
        res.status(403);
        res.send(err.message);
    }
    res.send(decoded.user);
}
router.post('/login', authenticate, (req, res) => {
    const token = jwt.sign({ user: 'lukesb' }, process.env.SECRET_KEY, { expiresIn: `20m` });
    const newLogin = {
        token: token,
        ttl: String(Date.now() + 1000 * 60 * 20),
    };
    res.json(newLogin);
});
router.post('/verify', (req, res) => {
    const token = req.headers.token;
    if (jwtMiddleware.verifyToken(token)) {
        res.status(200);
        res.send("Verified");
    }
    else {
        res.status(401);
        res.send("Invalid Token");
    }
});
router.get('/', jwtAuthenticate);
module.exports = router;
