
import IBlockchainService from "./IBlockchainService";
import { buildCAClient, buildCCPOrg1, buildWallet, connectToContract, registerAndEnrollUser, enrollAdmin } from "../utils/index";
import { uuid } from 'uuidv4';
import FabricCAServices from "fabric-ca-client";
import path from "path";
import { Wallet, Identity } from "fabric-network";
import { Expense } from "../types/Expense";

export class BlockchainService extends IBlockchainService{


    constructor(){
        super();
    }

    async initLedger(user: string): Promise<any> {
        try {
            const {contract} = await connectToContract(user,'mychannel','draft');
            await contract.submitTransaction('InitLedger');
            console.log(`Ledger initialized`);
            return ;
        }catch(error: any){
            throw new Error(error.message);
        }
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
    
    async createExpense(amount: number, type: string, concept: string, project: string, owner: string): Promise<any>{
        try {
            
            const {contract, userIdentity} = await connectToContract(owner,'mychannel','draft');
            const date = new Date();
            const id = uuid();
            const result: Buffer = await contract.submitTransaction('CreateAsset', id, amount.toString(), type, concept, project, owner, date.toISOString()) as any | null;
            if(result){
                contract.submitTransaction('CheckRequest', id);
                console.log(`Expense request sent.`);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                const jsonObj = JSON.parse(result.toString());
                return jsonObj;
            }else {
                return null;
            }
        } catch (error: any) {
            console.error(`Failed to evaluate transaction: ${error}`);
            throw new Error(error.message)
        }
    }
    
    async readExpense(id: string, owner: string): Promise<any> {
        try {
            const {contract} = await connectToContract(owner,'mychannel','draft');
            const result: Buffer = await contract.evaluateTransaction('ReadAsset', id) as any | null;
            if(result){

                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                const jsonObj = JSON.parse(result.toString());
                return jsonObj;   
            }else{
                return null;
            }
        }catch(error: any){
            throw new Error(error.message);

        }
    }

    async updateExpense(owner: string, expense: any) {
        try {
            const {contract} = await connectToContract(owner,'mychannel','draft');
            const date = new Date();            
            const result: Buffer = await contract.submitTransaction('UpdateAsset', expense.id, expense.amount.toString(), expense.expenseType, expense.concept, expense.project, date.toISOString()) as any | null;
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            const jsonObj = JSON.parse(result.toString());
            return jsonObj;   

        }catch(error: any){
            throw new Error(error.message);
        }
    }

    async getAllExpenses(user: string): Promise<any> {
        try {
            const {contract} = await connectToContract(user,'mychannel','draft');
            const expenses: any = await contract.submitTransaction('GetAllAssets');
            const jsonObj = JSON.parse(expenses.toString());
            return jsonObj.map((x: { Record: any; }) => x.Record);   

        }catch(error: any){
            throw new Error(error.message);
        }
    }


    async getExpenses(user: string, params: any): Promise<any> {
        try {
            const { type, project, state } = params;
            const {contract} = await connectToContract(user,'mychannel','draft');
            const expenses: any = await contract.submitTransaction('QueryAssetsByParams', user, type, project, state) as any | null;
            if(expenses){
                const jsonObj = JSON.parse(expenses.toString());
                console.log(`Transaction has been evaluated, result is: ${jsonObj}`);
                return jsonObj.map((x: { Record: any; }) => x.Record); 
            }else{
                return null;
            }
            
        }catch(error: any){
            throw new Error(error.message);
        }
    }

}

const blockchainService = new BlockchainService()

export default blockchainService;