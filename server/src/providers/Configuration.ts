import dotenv from 'dotenv';
import path from "path";

const url = 'http://localhost:8080';
const port = 8080;
const fabricSamplePath = path.join('\\\\wsl.localhost', 'Ubuntu', 'home','pablo', 'tfg','fabric-samples');
const apiPrefix = '/api';
const network = 'test-network';

dotenv.config();
const database_options = {
    host: process.env.DATABASE_HOST || "locahost",
    port: Number(process.env.DATABASE_PORT) || 3306,
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "root",
    database: process.env.DATABASE_NAME || "mysqldb",
    dialect: process.env.DATABASE_DIALECT || "mysql",

}
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
    database_options,
    url,
    port,
    apiPrefix,
    fabricSamplePath,
    network,
};

export default config;