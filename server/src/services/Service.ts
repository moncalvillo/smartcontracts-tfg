import path from "path";
import IService from "./IService";
import fs from 'fs';
import FabricCAServices, { IAffiliationRequest, IEnrollResponse, IRegisterRequest, IServiceResponse } from "fabric-ca-client";
import { Identity, IdentityProvider, Wallet, Wallets } from "fabric-network";
import { User } from "fabric-common";
import { AffiliationService } from "fabric-ca-client";

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

            //
            const ccpPath: string = path.resolve(__dirname, '..', 'network', 'ccps','connection-org1.json');
            const ccp: any = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
            const caInfo: any = ccp.certificateAuthorities['ca.org1.example.com'];
            const ca: FabricCAServices = new FabricCAServices(caInfo.url, {trustedRoots: caInfo.tlsCACerts.pem, verify: false}, caInfo.caName);
    
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            //

            const identity: Identity | undefined = await wallet.get('admin');
            if (identity) {
                console.log('An identity for the admin user "admin" already exists in the wallet');
                throw new Error('An identity for the admin user "admin" already exists in the wallet');
            }
    
            const enrollment: IEnrollResponse = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
            const x509Identity: Identity | any = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'Org1MSP',
                type: 'X.509',
            };
            await wallet.put('admin', x509Identity);
            console.log('Successfully enrolled admin user "admin" and imported it into the wallet');
            return wallet.get('admin');
        }catch(error){
            console.log(error);
            return undefined;
        }
        
    }

    async registerUser(userName: string, password: string): Promise<Identity | undefined> {
        console.log('Registering user: ' + userName);
        try {

            const ccpPath: string = path.resolve(__dirname, '..', 'network', 'ccps','connection-org1.json');
            const ccp: any = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    
            const caURL: string = ccp.certificateAuthorities['ca.org1.example.com'].url;
            const ca: FabricCAServices = new FabricCAServices(caURL);
            
            const walletPath: string = path.join(__dirname,'..', 'network', 'wallets');
            const wallet: Wallet = await Wallets.newFileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            const userIdentity: Identity | undefined = await wallet.get(userName);
            if (userIdentity) {
                console.log('An identity for the user "appUser" already exists in the wallet');
                throw new Error('An identity for the user "appUser" already exists in the wallet');
            }
    
            const adminIdentity: Identity | undefined | any = await wallet.get('admin');
            if (!adminIdentity) {
                console.log('An identity for the admin user "admin" does not exist in the wallet');
                console.log('Enroll an admin before this action.');
                throw new Error('An identity for the admin user "admin" does not exist in the wallet.\n Enroll an admin before this action.');
            }
    
            const provider: IdentityProvider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
            const adminUser: User = await provider.getUserContext(adminIdentity, 'admin');
            
            const secret: string = await ca.register({
                enrollmentID: userName,
                enrollmentSecret: password,
                role: 'client',
                affiliation: 'org1.department1',
            }, adminUser);

            const enrollment: IEnrollResponse = await ca.enroll({
                enrollmentID: userName,
                enrollmentSecret: secret
            });
    
            const x509Identity: Identity | any = {
                credentials: {
                    certificate: enrollment.certificate,
                    privateKey: enrollment.key.toBytes(),
                },
                mspId: 'Org1MSP',
                type: 'X.509',
            };
            await wallet.put(userName, x509Identity);
            console.log(`Successfully registered and enrolled admin user ${userName} and imported it into the wallet`);
            return wallet.get(userName);
        }catch(error){
            console.log(error);
            return undefined;
        }
    }

}

const service = new Service();

export default service;