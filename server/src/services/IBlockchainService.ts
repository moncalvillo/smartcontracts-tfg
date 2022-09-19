import { Identity } from "fabric-network";
import User from "../models/User";
import { Expense } from "../types/Expense";

export default abstract class IBlockchainService {
    abstract updateExpense(username: any, body: any): string | PromiseLike<string>;
    abstract createExpense(body: any): Promise<Expense | null>;
    abstract readExpense(id: string, owner: string): Promise<any>;
    abstract getExpenses(user:User, params: any): Promise<any>;
    abstract getAllExpenses(user: string): Promise<any>;
    abstract initLedger(user: string): Promise<any>;
    abstract enrollAdmin(): Promise<Identity | undefined>;
    abstract registerUser(userName: string, password: string): Promise<Identity | undefined>;
}