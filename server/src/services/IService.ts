
export default abstract class IService {
    abstract submitForm(project: string, concept: string, expenseType: string, amount: number, currency: string, date: string): Promise<boolean>;
}