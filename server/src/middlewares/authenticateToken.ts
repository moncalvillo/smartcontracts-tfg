import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../providers/Configuration';
function authenticateToken(req: Request, res: Response, next: Function) {
    const authHeader = req.headers['authorization'];    
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    if(JWT_SECRET === undefined) throw new Error("Token secret not defined");

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.body.user = user.user;
        next();
    })
}

export default authenticateToken;