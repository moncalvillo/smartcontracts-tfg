import {Request, Response} from 'express';
import IService from '../service/IService';
import Service from '../service/Service';

class Controller {
    
        constructor(private service: IService){ }
    
        test = async (req: Request, res: Response) => {
            const {name} = req.body;
            const result = this.service.test(name);
            return res.status(200).json({
                result
            });
        }
    
}


const controller = new Controller(Service)

export default controller;