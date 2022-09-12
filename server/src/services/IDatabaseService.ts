import { Identifier } from "sequelize/types";
import Project from "../models/Project";
import Type from "../models/Type";
import User from "../models/User";

export default abstract class IDatabaseService {
    abstract getUserByEmail(email: string): Promise<User>;
    abstract login(username: string, password: string) : Promise<any>;
    abstract getAll() : Promise<User[]>;
    abstract createUser(body: any): Promise<any>;
    abstract delete(id:Identifier): Promise<void>;

    abstract getProjects(): Promise<Project[]>;
    abstract getTypes(): Promise<Type[]>;
    abstract getUsers(currentUser: User): Promise<any>;
    abstract createProject(body: any): Promise<Project>;
    abstract createType(body: any): Promise<Type>;
    abstract deleteProject(id: Identifier): Promise<void>;
    abstract deleteType(id: Identifier): Promise<void>;
    // abstract getTypesByProject(user: User, project: string): Promise<any>;
}