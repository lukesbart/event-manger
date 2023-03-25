import { NextFunction, Request, Response } from 'express';

const jwt = require('jsonwebtoken');

function verifyToken(token: string | string[] | undefined) {
    // let decoded; 

    try {
       jwt.verify(token, process.env.SECRET_KEY);
    } catch(err: unknown) {
        return false;
    }

    return true;
}

function jwtAuthenticate(req: Request, res: Response, next: NextFunction) {
    if (verifyToken(req.headers.auth)) {
        return(next());
    }

    res.status(403);
    return(res.send("Invalid Token"));

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

export {jwtAuthenticate, verifyToken};