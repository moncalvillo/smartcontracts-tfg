import {Request, Response} from 'express';
import IService from '../services/IService';
import IUserService from '../services/IUserService';
import Service from '../services/Service';
import UserService from '../services/UserService';

class Controller {

    constructor(private service: IService, private userService: IUserService){}

    

    submitForm = async (req: Request, res: Response) => {
        // console.log(req.body);

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
        const { userName } = req.body;
        const user = await this.service.registerUser(userName);
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
}

const controller = new Controller(Service, UserService);

export default controller;