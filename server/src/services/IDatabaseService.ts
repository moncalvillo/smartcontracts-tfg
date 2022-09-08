import { Identifier } from "sequelize/types";
import User from "../models/User";

export default abstract class IDatabaseService {
    abstract getUserByEmail(email: string): Promise<User>;
    abstract login(username: string, password: string) : Promise<any>;
    abstract getAll() : Promise<User[]>;
    abstract createUser(body: any): Promise<any>;
    abstract delete(id:Identifier): Promise<void>;

    abstract getProjects(user: User): Promise<any>;
    abstract getTypes(user: User): Promise<any>;
    abstract getUsers(currentUser: User): Promise<any>;
    // abstract getTypesByProject(user: User, project: string): Promise<any>;
}