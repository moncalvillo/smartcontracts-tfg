import {Request, Response} from 'express';
import BlockchainService from '../services/BlockchainService';
import IDatabaseService from '../services/IDatabaseService';
import IBlockchainService from '../services/IBlockchainService';
import DatabaseService  from '../services/DatabaseService';
import { Expense } from '../types/Expense';
import populate from '../utils/populate';
class FabricController {

    constructor(private blockchainService: IBlockchainService, private databaseService: IDatabaseService){}


    test = async (req: Request, res: Response) => {
        return res.status(200).json({message: 'Fabric controller works'});
    }

    enrollAdmin = async (req: Request, res: Response) => {

        try {
            await this.databaseService.createUser({email: "admin@gmail.com", username: "admin", password: "adminpw"});
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message: 'Admin already exists'
            });
        }
        const admin = await this.blockchainService.enrollAdmin();
        if(admin){
            res.status(200).json({
                message: 'Admin enrolled successfully',
                admin: admin,
            });
        }else{
            res.status(400).json({
                message: 'Error enrolling admin'
            });
        }
    }

    init = async (req: Request, res: Response) => {
        try{
            await populate();
            res.status(200).json({
                message: 'Population successful',
            });
        }catch(err: any){
            console.log(err);
            return res.status(400).json({
                message: err.message
            });
        }

    }

    registerUser = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const user = await this.blockchainService.registerUser(username, password);
        if(user){
            res.status(200).json({
                message: 'User registered successfully',
                user: user,
            });
        }else{
            res.status(400).json({
                message: 'Error registering user'
            });
        }
    }

    createExpense = async (req: Request, res: Response) => {

        const { amount, expenseType, concept, project, user = 'userTest' } = req.body;
        try{
            const query: Expense = await this.blockchainService.createExpense(amount, expenseType, concept, project, user.username);
            if(query){
                res.status(200).json({
                    message: 'Query successful',
                    query: query,
                });
            }else{
                res.status(400).json({
                    message: 'Error querying'
                });
            }
        }catch(err: any){
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        }
        
    }

    readExpense = async (req: Request, res: Response) => {
        const { id, owner= 'userTest' } = req.body;
        try{
            const query: string = await this.blockchainService.readExpense(id, owner);
            if(query){
                res.status(200).json({
                    message: 'Query successful',
                    query: query,
                });
            }else{
                res.status(400).json({
                    message: 'Error querying'
                });
            }
        }catch(err: any){
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        }
    }

    updateExpense = async (req: Request, res: Response) => {
        const { user } = req.body;
        try{
            const query: string = await this.blockchainService.updateExpense(user.username, req.body);
            if(query){
                res.status(200).json({
                    message: 'Query successful',
                    query: query,
                });
            }else{
                res.status(400).json({
                    message: 'Error querying'
                });
            }
        }catch(err: any){
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        }

    }
    getAllExpenses = async (req: Request, res: Response) => {

        try{
            const { user="userTest" } = req.params; 
            const result: any = await this.blockchainService.getAllExpenses(user);
    
            if(result){
                res.status(200).json({
                    result,
                });
            }else{
                res.status(400).json({
                    message: 'Error retrieving expenses'
                });
            }
        }catch(err: any){
            console.log(err);
            return res.status(500).json({
                message: err.message
            });
        }

    }

    getExpenses = async (req: Request, res: Response) => {

        try{
            console.log(req.query);
            const user = req.body.user;
            const result: any = await this.blockchainService.getExpenses(user.username, req.query);
    
            if(result){
                res.status(200).json({
                    result,
                });
            }else{
                res.status(400).json({
                    message: 'Error retrieving expenses'
                });
            }
        }catch(err: any){
            console.log(err);
            return res.status(400).json({
                message: err.message
            });
        }
    }


    // request = async (req: Request, res: Response) => {

    //     try{

    //         const result: boolean = await this.blockchainService.requestExpense([...req.body]);
    
    //         if(result){
    //             res.status(200).json({
    //                 message: 'Expense request sent successfully',
    //                 result,
    //             });
    //         }else{
    //             res.status(500).json({
    //                 message: 'Error requesting expense'
    //             });
    //         }
    //     }catch(err: any){
    //         console.log(err);
    //         return res.status(500).json({
    //             message: err.message
    //         });
    //     }


    // }
  
}

const controller = new FabricController(BlockchainService, DatabaseService);

export default controller;