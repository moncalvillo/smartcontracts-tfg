import User from "../models/User";
import IUserService from "./IUserService";
import { Identifier } from "sequelize/types";
import { ClientUnaryCall } from "grpc";



export class UserService extends IUserService{

    constructor(){
        super()
    }

    async getAll(): Promise<User[]> {
        const allUsers: User[] = await User.findAll();
        return allUsers;
    }

    async createUser(body: any): Promise<User> {
        const count: number = await User.count({where: {email: body.email}});
        if (count !== 0) {
            throw new Error("Email already in use");
        }else {
            const newUser: User = await User.create(body);
            return newUser;
        }
    }
    
    async login(username: string, password: string): Promise<string> {
        console.log(username, password)
        const exists = await User.findOne({where: {username, password}});
        if (exists) {
            return "accesToken";
        }else{ 
            throw new Error("Invalid credentials");
        }

    }

    async delete(id: Identifier): Promise<void> {
        const deletedDog: User | null = await User.findByPk(id);
        await User.destroy({ where: { id } });
    }

    

}

const userService = new UserService()

export default userService;