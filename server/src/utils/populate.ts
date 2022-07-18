import Project from "../models/Project";
import Type from "../models/Type";
import User from "../models/User";
import BlockchainService  from "../services/BlockchainService";
import DatabaseService  from "../services/DatabaseService";
import fs from "fs";
import path from "path";

async function populate() {

    const directory =path.join(__dirname, "..", 'network', 'wallets');

    fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
            if (err) throw err;
        });
    }
    });


    await User.destroy({where: {}, truncate: true});
    await Project.destroy({where: {}, truncate: true});
    await Type.destroy({where: {}, truncate: true});

    await BlockchainService.enrollAdmin();


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

    BlockchainService.initLedger('userTest');


    return;


}

export default populate;


const users = [
    {
        email: "userTest@gmail.com",
        username: "userTest",
        password: "userTest",
        roleType: "user",
    },
    {
        email: "managerTest@gmail.com",
        username: "managerTest",
        password: "managerTest",
        roleType: "manager",
    },
    {
        email: "secondUser@gmail.com",
        username: "secondUser",
        password: "secondUser",
        roleType: "user",
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