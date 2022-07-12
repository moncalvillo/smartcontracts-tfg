
import IAPIService from "./IAPIService";
import path from "path";
import fs from "fs";
import { Wallets, Gateway, Wallet, Identity, Network, Contract, IdentityProvider } from "fabric-network";
import { User } from "fabric-common";
import UserInstance from "../models/User";
import { buildCCPOrg1, buildCCPOrg2, buildWallet, prettyJSONString } from "../utils";


export class APIService extends IAPIService{

    ccp: any = buildCCPOrg1();
    ccp2: any = buildCCPOrg2();

    constructor(){
        super();
    }

    async createExpense(amount: number, type: string, concept: string, project: string, owner: string): Promise<any>{
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);

            // Check to see if we've already enrolled the user.
            const userIdentity: Identity | undefined = await wallet.get(owner);
            if (!userIdentity) {
                console.log(`An identity for the user ${owner} does not exist in the wallet`);
                throw new Error(`An identity for the user ${owner} does not exist in the wallet`);
            }
            
            // Create a new gateway for connecting to our peer node.
            const gateway: Gateway = new Gateway();
            await gateway.connect(this.ccp, { wallet,
                identity: owner,
                discovery: { enabled: true, asLocalhost: true } 
            });
            // Get the network (channel) our contract is deployed to.
            const network: Network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract: Contract = network.getContract('draft');
            // Evaluate the specified transaction.

            const date = new Date();
            const id = uuid();
            const result: Buffer = await contract.submitTransaction('CreateAsset', id, amount.toString(), type, concept, project, userIdentity.mspId, date.toISOString());
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            // res.status(200).json({response: result.toString()});
            return result.toString();

        } catch (error: any) {
            console.error(`Failed to evaluate transaction: ${error}`);
            throw new Error(error.message)
        }
    }
    
    async readExpense(id: string, owner: string): Promise<any> {
        try {
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);

            const userIdentity: Identity | undefined = await wallet.get(owner);
            if (!userIdentity) {
                console.log('An identity for the user "appUser" does not exist in the wallet');
                throw new Error(`An identity for the user ${owner} does not exist in the wallet`);
            }
            
            const gateway: any = new Gateway();
            await gateway.connect(this.ccp, { wallet,
                identity: userIdentity,
                discovery: { enabled: true, asLocalhost: true } 
            });
            const network: Network = await gateway.getNetwork('mychannel');

            const contract: Contract = network.getContract('draft');
            const result: Buffer = await contract.evaluateTransaction('ReadAsset', id);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            // res.status(200).json({response: result.toString()});
            return result.toString();   

        }catch(error: any){
            throw new Error(error.message);

        }
    }
    async getRegisteredUsers() : Promise<any>{

        const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
        const wallet: Wallet = await Wallets.newFileSystemWallet(walletPath);

        const wallets: string[] = await wallet.list();


        const registeredUserDB: UserInstance[] = await UserInstance.findAll();
        const users: any = [];
        for(const user of registeredUserDB){
            const userIdentity: Identity | undefined = await wallet.get(user.username);
            const provider: IdentityProvider = wallet.getProviderRegistry().getProvider(userIdentity!.type);
            const userFabric: User = await provider.getUserContext(userIdentity!, user.username);
            const u = {
                username: userFabric.getName(),
                roles: userFabric.getRoles(),
                msp: userFabric.getMspid(),
                affiliation: userFabric.getAffiliation(),
                enrollSecret: userFabric.getEnrollmentSecret(),
            }
            users.push(u);
        }
        
        return {wallets,users};
    }
    

}

const apiService = new APIService()

export default apiService;