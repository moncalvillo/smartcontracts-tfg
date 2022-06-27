import { Identifier } from "sequelize/types";
import User from "../models/User";

export default abstract class IUserService {
    abstract login(username: string, password: string) : Promise<string>;
    abstract getAll() : Promise<User[]>;
    abstract createUser(body: any): Promise<User>;
    abstract delete(id:Identifier): Promise<void>;
}