import {Request, Response} from 'express';
import OracleService from '../services/OracleService';
import IOracleService from '../services/IOracleService';


class OracleController {

    constructor(private readonly oracleService: IOracleService){ }
    
    test = async (req: Request, res: Response) => {
        const test: any = await this.oracleService.test();
        return res.status(200).send(test);
    }

    resolve = async (req: Request, res: Response) => {
        const { id, resolution, inspector, state } = req.body;
        try{
            const result: any = await this.oracleService.resolve(id, inspector, resolution, state);
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

}

const oracleController = new OracleController(OracleService)

export default oracleController;