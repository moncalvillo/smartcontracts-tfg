
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

    async firstQuery(): Promise<any>{
        try {
            // Create a new file system based wallet for managing identities.
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await buildWallet(walletPath);

            // Check to see if we've already enrolled the user.
            const userExists: Identity | undefined = await wallet.get('userTest');
            if (!userExists) {
                console.log('An identity for the user "appUser" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return "";
            }
            
            // Create a new gateway for connecting to our peer node.
            const gateway: any = new Gateway();
            await gateway.connect(this.ccp, { wallet,
                identity: 'userTest',
                discovery: { enabled: true, asLocalhost: true } 
            });
            // Get the network (channel) our contract is deployed to.
            const network: Network = await gateway.getNetwork('mychannel');

            // Get the contract from the network.
            const contract: Contract = network.getContract('basic');
            // Evaluate the specified transaction.
            const result: Buffer = await contract.evaluateTransaction('GetAllAssets');
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            // res.status(200).json({response: result.toString()});
            return result.toString();

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            // res.status(500).json({error: error});
            return "";
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