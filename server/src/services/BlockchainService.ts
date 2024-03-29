
import IBlockchainService from "./IBlockchainService";
import { buildCAClient, buildCCPOrg1, buildWallet, connectToContract, registerAndEnrollUser, enrollAdmin } from "../utils/index";
import { uuid } from 'uuidv4';
import FabricCAServices from "fabric-ca-client";
import path from "path";
import { Wallet, Identity } from "fabric-network";
import { Expense } from "../types/Expense";
import config from "../providers/Configuration";
import { json } from "stream/consumers";
import User from "../models/User";

export class BlockchainService extends IBlockchainService{


    constructor(){
        super();
    }

    async initLedger(wallet: string): Promise<any> {
        try {
            const {contract} = await connectToContract(wallet,'mychannel');
            await contract.submitTransaction('InitLedger');
            console.log(`Ledger initialized`);
            return ;
        }catch(error: any){
            console.error(error.message);
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
                throw new Error('Could not create admin identity');
            }
            return adminWallet;
        }catch(error){
            console.error(error);
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
    
    async createExpense(body: any): Promise<Expense | null>{
        try {
            const { amount, expenseType, concept, project, currency, user } = body;
            const {contract} = await connectToContract(user.wallet,'mychannel');
            const date: Date = new Date();
            const expenseId: string = uuid();
            const {  email, wallet, firstName, lastName, roleType } = user;
            const userSTR: string = JSON.stringify({email, firstName, lastName, wallet, roleType})
            
            
            const result: Buffer = await contract.submitTransaction('CreateAsset', expenseId, amount.toString(), currency, expenseType, concept, project, userSTR, date.toISOString()) as any | null;
            if(result){
                console.log(`Expense request sent.`);
                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                return JSON.parse(result.toString());
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
            const {contract} = await connectToContract(walletStr,'mychannel');
            const result: Buffer = await contract.evaluateTransaction('ReadAsset', id) as any | null;
            if(result){

                console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
                return JSON.parse(result.toString());   
            }else{
                return null;
            }
        }catch(error: any){
            throw new Error(error.message);

        }
    }

    async updateExpense(walletStr: string, expense: any) {
        try {
            const {contract} = await connectToContract(walletStr,'mychannel');
            const date = new Date();            
            const result: Buffer = await contract.submitTransaction('UpdateAsset', expense.id, expense.amount.toString(), expense.expenseType, expense.concept, expense.project, date.toISOString()) as any | null;
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            return JSON.parse(result.toString());   

        }catch(error: any){
            throw new Error(error.message);
        }
    }

    async getAllExpenses(walletStr: string): Promise<any> {
        try {
            const {contract} = await connectToContract(walletStr,'mychannel');
            const expenses: any = await contract.submitTransaction('GetAllAssets');
            const jsonObj = JSON.parse(expenses.toString());
            const list = jsonObj.map((x: { Record: any; }) => {
                return x.Record;
            });
            const sorted = list.sort((objA: Expense, objB: Expense) => Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)));
            return sorted; 

        }catch(error: any){
            throw new Error(error.message);
        }
    }


    async getExpenses(currentUser: User, params: any): Promise<any> {
        try {
            const { type, project, state, user } = params;
            const {  email, wallet, firstName, lastName, roleType } = currentUser;
            const userSTR: string = JSON.stringify({email, firstName, lastName, wallet, roleType});
            const {contract} = await connectToContract(currentUser.wallet,'mychannel');
            const searchBy: string = currentUser.roleType !== 'user' ? user : userSTR;
            const expenses: any = await contract.submitTransaction('QueryAssetsByParams', searchBy, type, project, state) as any | null;
            
            if(expenses){
                const jsonObj = JSON.parse(expenses.toString());
                const list = jsonObj.map((x: { Record: any; }) => {
                    return x.Record;
                } );
                console.log(`Transaction has been evaluated, result is: ${jsonObj}`);
                const sorted = list.sort((objA: Expense, objB: Expense) => Number(new Date(objB.createdAt)) - Number(new Date(objA.createdAt)));
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