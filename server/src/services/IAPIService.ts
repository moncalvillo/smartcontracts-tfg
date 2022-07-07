
export default abstract class IAPIService {
    abstract createExpense(amount: number, type: string, concept: string, project: string, owner: string): Promise<any>;
    abstract readExpense(id: string, owner: string): Promise<any>;
    abstract getRegisteredUsers(): Promise<any>;
}