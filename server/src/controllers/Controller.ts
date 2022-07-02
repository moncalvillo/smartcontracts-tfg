import {Request, Response} from 'express';
import IAPIService from '../services/IAPIService';
import IService from '../services/IService';
import IUserService from '../services/IUserService';
import Service from '../services/Service';
import UserService from '../services/UserService';
import APIService from '../services/APIService';

class Controller {

    constructor(private service: IService, private userService: IUserService, private apiService: IAPIService){}

    
    test = async (req: Request, res: Response) => {
        return res.json({message: 'test'});
    }

    submitForm = async (req: Request, res: Response) => {

        const { project, concept, expenseType, amount, currency, date } = req.body;
        const method = await this.service.submitForm(project, concept, expenseType, amount, currency, date);
        if(method){
            res.status(200).json({
                message: 'Form submitted successfully'
            });
        }else{
            res.status(500).json({
                message: 'Error submitting form'
            });
        }
    }

    enrollAdmin = async (req: Request, res: Response) => {

        try {
            await this.userService.createUser({email: "admin@gmail.com", username: "admin", password: "adminpw"});
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: 'Admin already exists'
            });
        }
        const admin = await this.service.enrollAdmin();
        if(admin){
            res.status(200).json({
                message: 'Admin enrolled successfully',
                admin: admin,
            });
        }else{
            res.status(500).json({
                message: 'Error enrolling admin'
            });
        }
    }

    registerUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await this.service.registerUser(username, password);
        if(user){
            res.status(200).json({
                message: 'User registered successfully',
                user: user,
            });
        }else{
            res.status(500).json({
                message: 'Error registering user'
            });
        }
    }

    firstQuery = async (req: Request, res: Response) => {

        const query: string = await this.apiService.firstQuery();
        if(query){
            res.status(200).json({
                message: 'Query successful',
                query: query,
            });
        }else{
            res.status(500).json({
                message: 'Error querying'
            });
        }
    }

    getRegisteredUsers = async (req: Request, res: Response) => {

        const {wallets, users} = await this.apiService.getRegisteredUsers();

        if(wallets){
            res.status(200).json({
                message: 'Users retrieved successfully',
                wallets,
                users,
            });
        }else{
            res.status(500).json({
                message: 'Error retrieving users'
            });
        }

    }
  
}

const controller = new Controller(Service, UserService, APIService);

export default controller;