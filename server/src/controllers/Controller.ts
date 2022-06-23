import {Request, Response} from 'express';
import IService from '../services/IService';
import Service from '../services/Service';

class Controller {

    constructor(private service: IService){}

    submitForm = async (req: Request, res: Response) => {
        console.log(req.body);

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
}

const controller = new Controller(Service);

export default controller;