import {Request, Response} from 'express';
import User from '../models/User';
import IUserService from '../services/IUserService';
import  UserService  from '../services/UserService';

class UserController {

    constructor(private userService: IUserService){ }

    login = async (req: Request, res: Response) => {
        const {username, password} = req.body;
        try{
            const accessToken: string  = await this.userService.login(username, password);
            return res.status(200).json({accessToken});
        }catch(error:any){
            console.log(error)
            return res.status(400).json({message: error.message});
        }
    }

    getAll = async (req:Request, res:Response) => {
        const allUsers = await this.userService.getAll();
        return res.json(allUsers);
    }

    create = async (req:Request, res: Response) => {
        try{
            const accessToken: string = await this.userService.createUser({...req.body});
            return res.status(201).json({accessToken});
        }catch(error: any){
            return res.status(400).json({message: error.message});
        }
    }

    delete = (req:Request, res: Response) => {
        const { id } = req.params
        this.userService.delete(id)
        return res.status(200).end();
    }

}

const userController = new UserController(UserService)

export default userController;