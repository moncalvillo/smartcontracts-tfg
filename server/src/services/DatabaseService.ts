import User from "../models/User";
import { Identity } from "fabric-network";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import connection from "../providers/Connection";
import IBlockchainService from "./IBlockchainService";
import IDatabaseService from "./IDatabaseService";
import BlockchainService  from "./BlockchainService";
import { Identifier } from "sequelize/types";
import Project from "../models/Project";
import Type from "../models/Type";
import { v4 } from "uuid";

export class DatabaseService extends IDatabaseService{

    constructor(private service: IBlockchainService) {
        super()
    }

    async getAll(): Promise<User[]> {
        const allUsers: User[] = await User.findAll();
        return allUsers;
    }

    async createUser(body: any): Promise<any> {
        const count: number = await User.count({where: {email: body.email}});
        if (count !== 0) {
            throw new Error("Email already in use");
        }
        const allCount: number = await User.count();
        
        const hashedPw: string = await this.hashPassword(body.password);
        const t = await connection.transaction();

        const createUser: any = {
            id: allCount+1,
            email: body.email,
            password: hashedPw,
            roleType: body.roleType || "user",
            firstName: body.firstName,
            lastName: body.lastName,
            wallet: body.wallet || v4(),
        }
        try{
            const newUser: User = await User.create(createUser, {transaction: t});
            if(newUser && newUser.roleType !== "admin"){
                const newUserWallet: Identity | undefined = await this.service.registerUser(newUser.wallet, hashedPw) 
            }
            await t.commit();
            const res: any = {
                email: newUser.email,
                id: newUser.id,
                roleType: newUser.roleType,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                wallet: newUser.wallet,
                accessToken: this.generateToken(newUser),
            }
            return res;
        }catch(err:any){
            await t.rollback();
            console.log(err);
            throw new Error(err.message);
        }
        
    }
    
    async login(email: string, password: string): Promise<any> {
        const user: User | null = await User.findOne({where: {email}});
        if (user && await bcrypt.compare(password, user!.password)) {
            const res: any = {
                email: user.email,
                id: user.id,
                roleType: user.roleType,
                firstName: user.firstName,
                lastName: user.lastName,
                wallet: user.wallet,
                accessToken: this.generateToken(user),
            }
            return res;
        }else{ 
            throw new Error("Invalid credentials");
        }

    }

    async delete(id: Identifier): Promise<void> {
        await User.destroy({ where: { id } });
    }

    async getUserByEmail(email: string): Promise<any> {
        const user: User | null = await User.findOne({where: {email}});
        if(user) {
            const res: any = {
                email: user.email,
                id: user.id,
                roleType: user.roleType,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: this.generateToken(user),
            }
            return res;
        }else {
            return null;
        }
    }

    generateToken(user: User): string {
        dotenv.config()
        const token = jwt.sign({user}, process.env.TOKEN_SECRET as string, {expiresIn: '10d'});
        return token;
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(6);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    }


    async createProject(body: any): Promise<Project> {
        const {name} = body;
        try{

            const project: Project = await Project.create({name});
            return project;
        }
        catch(err:any){
            console.log(err.message);
            
            throw new Error(err.message);
        }
            
    }

    async createType(body: any): Promise<Type> {
        const {name} = body;
        try{
            const type: Type = await Type.create({name});
            return type;
        }catch(err:any){
            console.log(err.message);
            throw new Error(err.message);
        }
    }

    async getProjects(): Promise<Project[]> {
        const projects: Project[] = await Project.findAll();
        return projects;
    }

    async getTypes(): Promise<Type[]> {
        const types: Type[] = await Type.findAll();
        return types;
    }

    async getUsers(): Promise<any> {
        const users: User[] = await User.findAll();
        const list =  users.filter((user: User) => user.roleType === 'user').map((user) =>{
            const json = user.toJSON();
            delete json.password;
            delete json.id;
            return json;
        });
        return list;
    }   

    async deleteProject(id: Identifier): Promise<void> {
        await Project.destroy({ where: { id } });
    }

    async deleteType(id: Identifier): Promise<void> {
        await Type.destroy({ where: { id } });
    }


}

const databaseService = new DatabaseService(BlockchainService)

export default databaseService;