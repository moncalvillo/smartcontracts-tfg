import IService from "./IService";


export class Service extends IService{


    test(name: string): string {
        return `Hello, ${name}!`;
    }


}

const service = new Service()

export default service;
