import {Request, Response} from 'express';
import OracleService from '../services/OracleService';
import IOracleService from '../services/IOracleService';
import ExpenseResolution from '../models/ExpenseResolution';


class OracleController {

    constructor(private readonly oracleService: IOracleService){ }
    
    test = async (req: Request, res: Response) => {
        const test: any = await this.oracleService.test();
        return res.status(200).send(test);
    }

    resolve = async (req: Request, res: Response) => {
        try{
            const result: any = await this.oracleService.resolve(req.body);
            if(result){
                res.status(200).json({
                    message: 'Query successful',
                    result: result,
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

    getPending = async (req: Request, res: Response) => {
        try{
            const user = req.body.user;
            const result: ExpenseResolution[] = await this.oracleService.getPending(user.wallet, req.query);
            if(result){
                res.status(200).json({
                    message: 'Query successful',
                    result,
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

    countPending = async (req: Request, res: Response) => {
        try{
            const user = req.body.user;
            const result: Number = await this.oracleService.countPending(user.wallet);

            if(result !== null){

                res.status(200).json({
                    message: 'Query successful',
                    result: result,
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


}

const oracleController = new OracleController(OracleService)

export default oracleController;