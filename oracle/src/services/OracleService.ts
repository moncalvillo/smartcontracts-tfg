
import ExpenseResolution from "../models/ExpenseResolution";
import { connectToContract } from "../utils";
import IOracleService from "./IOracleService";

export class OracleService extends IOracleService{
    

    constructor() {
        super()
    }

    async test(): Promise<any> {
        return {message: 'Oracle test'};
    }

    async resolve(id: string, inspector: string, resolution: string, state: string): Promise<any> {
        try {
            
            const {contract, userIdentity} = await connectToContract(inspector,'mychannel','draft');
            const result: Buffer = await contract.submitTransaction('ResolveAsset', 
                id,
                resolution,
                state,
                inspector) as any | null;

            if(result){
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

}

const oracleService = new OracleService()

export default oracleService;