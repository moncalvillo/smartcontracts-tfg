import {Request, Response} from 'express';
import DatabaseService from '../services/DatabaseService';
import IDatabaseService from '../services/IDatabaseService';
import jwtDecode from 'jwt-decode';

class UserController {

    constructor(private databaseService: IDatabaseService){ }

    login = async (req: Request, res: Response) => {
        const {email, password} = req.body;
        try{
            const user: any  = await this.databaseService.login(email, password);
            return res.status(200).json({user});
        }catch(error:any){
            console.log(error)
            return res.status(400).json({message: error.message});
        }
    }

    getAll = async (req:Request, res:Response) => {
        const allUsers = await this.databaseService.getAll();
        return res.json(allUsers);
    }

    create = async (req:Request, res: Response) => {
        try{
            const user: any = await this.databaseService.createUser({...req.body});
            return res.status(201).json({user});
        }catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    delete = (req:Request, res: Response) => {
        const { id } = req.params
        this.databaseService.delete(id)
        return res.status(200).end();
    }

    getProjects = async (req:Request, res: Response) => {
        const { user } = req.body;
        const projects = await this.databaseService.getProjects(user.username);
        return res.status(200).json({
            result: projects
        });
    }

    getTypes = async (req:Request, res: Response) => {
        const { user } = req.body;
        const types = await this.databaseService.getTypes(user.username);
        return res.status(200).json({
            result: types
        });
    }

    getUsers = async (req:Request, res: Response) => {
        const { user } = req.body;
        const users = await this.databaseService.getUsers(user);
        return res.status(200).json({
            result: users
        });
    }

    getUser = async (req:Request, res: Response) => {
        const authHeader = req.headers['authorization'];    
        const token: string | undefined = authHeader && authHeader.split(' ')[1];

        const decodedToken: any = jwtDecode(token as string);
        const obj = {
            username: decodedToken.user.username,
            email: decodedToken.user.email,
            id: decodedToken.user.id,
            firstName: decodedToken.user.firstName,
            lastName: decodedToken.user.lastName,
            roleType: decodedToken.user.roleType
        }
        return res.status(200).json({user: obj});

    }

}

const userController = new UserController(DatabaseService)

export default userController;