import path from "path";
import IService from "./IService";
import FabricCAServices  from "fabric-ca-client";
import { Identity,Wallet } from "fabric-network";
import {buildCAClient, buildCCPOrg1, buildWallet, enrollAdmin, registerAndEnrollUser} from "../utils/index";
export class Service extends IService{
    
    constructor(){
        super()
    }


    submitForm(project: string, concept: string, expenseType: string, amount: number, currency: string, date: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }


    async enrollAdmin(): Promise<Identity |undefined> {
        try{
            const ccp: any = buildCCPOrg1();
            const ca: FabricCAServices = buildCAClient(ccp, 'ca.org1.example.com');
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);
            const adminWallet: Identity | undefined = await enrollAdmin(ca, wallet, 'Org1MSP');
            if(!adminWallet){
                throw new Error('Could not create aadmin identity');
            }
            return adminWallet;
        }catch(error){
            console.log(error);
            return undefined;
        }
        
    }

    async registerUser(userName: string, password: string): Promise<Identity | undefined> {
        console.log('Registering user: ' + userName);
        try {

            const ccp: any = buildCCPOrg1();
            const ca: FabricCAServices = buildCAClient(ccp, 'ca.org1.example.com');
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);
    
            const walletUser: Identity |undefined = await registerAndEnrollUser(ca, wallet, 'Org1MSP', userName, password, 'org1.department1');
            if(!walletUser){
                throw new Error('Could not create user identity');
            }
            return walletUser;
        }catch(error: any){
            console.log(error);
            throw new Error(error.message);
        }
    }

}

const service = new Service();

export default service;