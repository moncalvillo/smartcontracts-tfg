import IService from "./IService";


export class Service extends IService{
    
    constructor(){
        super()
    }

    submitForm(project: string, concept: string, expenseType: string, amount: number, currency: string, date: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

}

const service = new Service();

export default service;