import {Request, Response} from 'express';
import DatabaseService  from '../services/DatabaseService';
import IDatabaseService from '../services/IDatabaseService';
import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {

    constructor(private readonly databaseService: IDatabaseService){ }
    google = async (req: Request, res: Response) => {
        const { token } = req.body;
        const client: OAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

        const ticket: any = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const googleUser: any = ticket.getPayload();
        console.log(googleUser)

        const userExists: any = await this.databaseService.getUserByEmail(googleUser.email);
        if(userExists){
            console.log(userExists)
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
        return null;
    }

}

const authController = new AuthController(DatabaseService)

export default authController;