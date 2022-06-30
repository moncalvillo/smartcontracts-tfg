import { IServiceResponse } from "fabric-ca-client";
import { Identity } from "fabric-network";

export default abstract class IService {
    abstract submitForm(project: string, concept: string, expenseType: string, amount: number, currency: string, date: string): Promise<boolean>;
    abstract enrollAdmin(): Promise<Identity | undefined>;
    abstract registerUser(userName: string, password: string): Promise<Identity | undefined>;
    // abstract addAffiliation(affiliation: string): Promise<IServiceResponse>;
}