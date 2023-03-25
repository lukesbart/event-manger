"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.jwtAuthenticate = void 0;
const jwt = require('jsonwebtoken');
function verifyToken(token) {
    // let decoded; 
    try {
        jwt.verify(token, process.env.SECRET_KEY);
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.verifyToken = verifyToken;
function jwtAuthenticate(req, res, next) {
    if (verifyToken(req.headers.auth)) {
        return (next());
    }
    res.status(403);
    return (res.send("Invalid Token"));
    // let decoded;
    // try {
    //     decoded = jwt.verify(req.headers.auth, process.env.SECRET_KEY);
    // } catch(err: any) {
    //     console.log(req.headers.auth)
    //     res.status(403);
    //     return(res.send(err.message))
    // }
    // next();
}
exports.jwtAuthenticate = jwtAuthenticate;
