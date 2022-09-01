import {Request, Response} from 'express';
import DatabaseService  from '../services/DatabaseService';
import IDatabaseService from '../services/IDatabaseService';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';
import IAuthService from '../services/IAuthService';
import AuthService from '../services/AuthService';

dotenv.config();

class AuthController {

    constructor(private readonly databaseService: IDatabaseService, private readonly authService: IAuthService){ }
    google = async (req: Request, res: Response) => {
        const { token } = req.body;
        const googleUser: any = await this.authService.getGoogleUser(token);
        const userExists: any = await this.databaseService.getUserByEmail(googleUser.email);
        if(userExists){
            return res.status(200).send({user: userExists});
        }else{
            const newUser = await this.databaseService.createUser({
                email: googleUser.email,
                password: googleUser.sub,
                firstName: googleUser.given_name,
                lastName: googleUser.family_name,
                roleType: 'user',
            });
            return res.status(201).send({user: newUser});
        }
        
    }

    facebook = async (req: Request, res: Response) => {
        const facebookUser: any = req.user;
        const userExists: any = await this.databaseService.getUserByEmail(facebookUser._json.email);
        if(userExists){
            return res.status(200).send({user: userExists});
        }else{
            const newUser = await this.databaseService.createUser({
                email: facebookUser._json.email,
                password: facebookUser._json.id,
                firstName: facebookUser._json.first_name,
                lastName: facebookUser._json.last_name,
                roleType: 'user',
            });
            return res.status(201).send({user: newUser});
        }
    }

}

const authController = new AuthController(DatabaseService, AuthService)

export default authController;