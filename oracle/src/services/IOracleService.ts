import ExpenseResolution from "../models/ExpenseResolution";

export default abstract class IOracleService {
    abstract test(): Promise<any>;
    abstract resolve(body: any): Promise<any>;
    abstract getPending(inspector: string, params: any): Promise<ExpenseResolution[]>;
    abstract countPending(inspector: string): Promise<any>;
}