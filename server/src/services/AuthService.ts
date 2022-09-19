
import IDatabaseService from "./IDatabaseService";
import IAuthService from "./IAuthService";
import  DatabaseService  from "./DatabaseService";
const {OAuth2Client} = require('google-auth-library');
export class AuthService extends IAuthService{

    constructor(private databaseService: IDatabaseService) {
        super()
    }

    async getGoogleUser(token: string): Promise<any> {
        const client: any = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

        const ticket: any = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const googleUser: any = ticket.getPayload();

        return googleUser;
    }


}

const authService = new AuthService(DatabaseService)

export default authService;