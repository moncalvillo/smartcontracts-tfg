import { Identity } from "fabric-network";
import { Expense } from "../types/Expense";

export default abstract class IAuthService {
    abstract getGoogleUser(token: string): Promise<any>;
}