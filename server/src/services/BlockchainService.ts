
import IBlockchainService from "./IBlockchainService";
import { buildCAClient, buildCCPOrg1, buildWallet, connectToContract, registerAndEnrollUser, enrollAdmin } from "../utils/index";
import { uuid } from 'uuidv4';
import FabricCAServices from "fabric-ca-client";
import path from "path";
import { Wallet, Identity } from "fabric-network";
import { Expense } from "../types/Expense";
import config from "../providers/Configuration";

export class BlockchainService extends IBlockchainService{


    constructor(){
        super();
    }

    async initLedger(wallet: string): Promise<any> {
        try {
            const {contract} = await connectToContract(wallet,'mychannel','draft');
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
            const walletPath: string = path.join(config.fabricSamplePath, config.network, 'wallets');
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

    async registerUser(walletStr: string, password: string): Promise<Identity | undefined> {
        console.log('Registering user: ' + walletStr);
        try {

            const ccp: any = buildCCPOrg1();
            const ca: FabricCAServices = buildCAClient(ccp, 'ca.org1.example.com');
            const walletPath: string = path.join(config.fabricSamplePath, config.network, 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);
    
            const walletUser: Identity |undefined = await registerAndEnrollUser(ca, wallet, 'Org1MSP', walletStr, password, 'org1.department1');
            if(!walletUser){
                throw new Error('Could not create user identity');
            }
            return walletUser;
        }catch(error: any){
            console.log(error);
            throw new Error(error.message);
        }
    }
    
    async createExpense(amount: number, type: string, concept: string, project: string, walletStr: string, currency: string): Promise<any>{
        try {
            
            const {contract, userIdentity} = await connectToContract(walletStr,'mychannel','draft');
            const date = new Date();
            const id = uuid();
            const result: Buffer = await contract.submitTransaction('CreateAsset', id, amount.toString(), currency, type, concept, project, walletStr, date.toISOString()) as any | null;
            if(result){
                // contract.submitTransaction('CheckRequest', id);
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
    
    async readExpense(id: string, walletStr: string): Promise<any> {
        try {
            const {contract} = await connectToContract(walletStr,'mychannel','draft');
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

    async updateExpense(walletStr: string, expense: any) {
        try {
            const {contract} = await connectToContract(walletStr,'mychannel','draft');
            const date = new Date();            
            const result: Buffer = await contract.submitTransaction('UpdateAsset', expense.id, expense.amount.toString(), expense.expenseType, expense.concept, expense.project, date.toISOString()) as any | null;
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            const jsonObj = JSON.parse(result.toString());
            return jsonObj;   

        }catch(error: any){
            throw new Error(error.message);
        }
    }

    async getAllExpenses(walletStr: string): Promise<any> {
        try {
            const {contract} = await connectToContract(walletStr,'mychannel','draft');
            const expenses: any = await contract.submitTransaction('GetAllAssets');
            const jsonObj = JSON.parse(expenses.toString());
            const list = jsonObj.map((x: { Record: any; }) => x.Record);
            const sorted = list.sort((objA: Expense, objB: Expense) => Number(new Date(objB.Date)) - Number(new Date(objA.Date)));
            return sorted; 

        }catch(error: any){
            throw new Error(error.message);
        }
    }


    async getExpenses(walletStr: string, params: any): Promise<any> {
        try {
            const { type, project, state } = params;
            console.log(walletStr);
            const {contract} = await connectToContract(walletStr,'mychannel','draft');
            const expenses: any = await contract.submitTransaction('QueryAssetsByParams', walletStr, type, project, state) as any | null;
            if(expenses){
                const jsonObj = JSON.parse(expenses.toString());
                console.log(`Transaction has been evaluated, result is: ${jsonObj}`);
                const list = jsonObj.map((x: { Record: any; }) => x.Record);
                const sorted = list.sort((objA: Expense, objB: Expense) => Number(new Date(objB.Date)) - Number(new Date(objA.Date)));
                return sorted; 
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