import { Request, Response } from 'express';
import jwtDecode from 'jwt-decode';

function verifyRole(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization?.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    
    const decoded: any = jwtDecode(token);
    if(decoded.user.roleType === 'user'){
        return res.sendStatus(403);
    }

    req.body.user = decoded.user;
    next();
}

export default verifyRole;