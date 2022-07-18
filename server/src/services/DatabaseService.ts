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

export class DatabaseService extends IDatabaseService{

    constructor(private service: IBlockchainService) {
        super()
    }

    async getAll(): Promise<User[]> {
        const allUsers: User[] = await User.findAll();
        return allUsers;
    }

    async createUser(body: any): Promise<string> {
        console.log(body)
        const count: number = await User.count({where: {email: body.email, username: body.username}});
        if (count !== 0) {
            throw new Error("Email or username already in use");
        }
        const allCount: number = await User.count();
        
        const hashedPw: string = await this.hashPassword(body.password);
        const t = await connection.transaction();

        const createUser: any = {
            id: allCount+1,
            email: body.email,
            username: body.username,
            password: hashedPw,
        }
        try{
            const newUser: User = await User.create(createUser, {transaction: t});
            if(newUser && newUser.username !== "admin"){
                const newUserWallet: Identity | undefined = await this.service.registerUser(body.username, hashedPw) 
            }
            await t.commit();
            const token = this.generateToken(newUser);
            return token;
        }catch(err:any){
            await t.rollback();
            console.log(err);
            throw new Error(err.message);
        }
        
    }
    
    async login(username: string, password: string): Promise<string> {
        const user: User | null = await User.findOne({where: {username}});
        const checkPw: boolean = await bcrypt.compare(password, user!.password);
        if (user && checkPw) {
            return this.generateToken(user);
        }else{ 
            throw new Error("Invalid credentials");
        }

    }

    async delete(id: Identifier): Promise<void> {
        const deletedDog: User | null = await User.findByPk(id);
        await User.destroy({ where: { id } });
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


    async getProjects(user: User): Promise<any> {
        const projects: Project[] = await Project.findAll();
        return projects;
    }

    async getTypes(user: User): Promise<any> {
        const types: Type[] = await Type.findAll();
        return types;
    }


}

const databaseService = new DatabaseService(BlockchainService)

export default databaseService;