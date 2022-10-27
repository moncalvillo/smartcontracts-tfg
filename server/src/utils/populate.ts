import Project from "../models/Project";
import Type from "../models/Type";
import User from "../models/User";
import BlockchainService  from "../services/BlockchainService";
import DatabaseService  from "../services/DatabaseService";
import fs from "fs";
import path from "path";
import { uuid } from "uuidv4";
import config from "../providers/Configuration";

async function populate() {

    const directory =path.join(config.fabricSamplePath, config.network, 'wallets');

    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
        console.log('Folder Created Successfully.');
    }else {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
    
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        });
    }

    if(await User.count() !== 0) await User.destroy({where: {}, truncate: true});
    if(await Type.count() !== 0) await Type.destroy({where: {}, truncate: true});
    if(await Project.count() !== 0) await Project.destroy({where: {}, truncate: true});


    await BlockchainService.enrollAdmin();

    if(config.populate){
        for(const user of users){
            await DatabaseService.createUser(user);
        }
    
        for(const project of projectNames){
            await Project.create({
                name: project
            })
        }
        for(const type of typeNames){
            await Type.create({
                name: type
            })
        }
    
        BlockchainService.initLedger('as8a5f6b-1975-4d66-b085-c6fc910ee6df');    
    }

    

    return;


}

export default populate;


const users = [
    {
        email: "userTest@gmail.com",
        password: "userTest",
        roleType: "user",
        firstName: "User",
        lastName: "Test",
        wallet: "as8a5f6b-1975-4d66-b085-c6fc910ee6df"
    },
    {
        email: "managerTest@gmail.com",
        password: "managerTest",
        roleType: "manager",
        firstName: "Manager",
        lastName: "Test",
        wallet: "a4355f6b-1975-4d66-b085-c6fc910ee6ss"
    },
    {
        email: "secondUser@gmail.com",
        password: "secondUser",
        roleType: "user",
        firstName: "Second",
        wallet: "r48a5f6b-1975-4d66-b085-c6fc910ee6aa",
        lastName: "User"
    }
]

const projectNames = [
    'Helheim',
    'Niflheim',
    'Svartalfheim',
    'Muspellheim',
    'Jotunheim',
    'Midgard',
    'Alfheim',
    'Vanaheim',
    'Asgard'
]

const typeNames = [
    'Material',
    'Equipment',
    'Service',
    'Product',
    'Consultation',
    'Other'
]
