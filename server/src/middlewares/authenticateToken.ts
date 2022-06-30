import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: Function) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    if(process.env.TOKEN_SECRET === undefined) return res.status(401).send('Please, login first');

    if(token==='accessToken') next();
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.body.user = user
        next()
    })
}

export default authenticateToken;