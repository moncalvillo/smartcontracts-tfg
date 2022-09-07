import ExpenseResolution from "../models/ExpenseResolution";

export default abstract class IOracleService {
    abstract test(): Promise<any>;
    abstract resolve(id: string, inspector: string, resolution: string, state: string): Promise<any>;
}