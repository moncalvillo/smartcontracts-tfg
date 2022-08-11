import dotenv from 'dotenv';
import path from "path";

const url = 'http://localhost:8080';
const port = 8080;
const networkPath = path.join('\\\\wsl.localhost', 'Ubuntu', 'home','pablo', 'tfg','fabric-samples');
const apiPrefix = '/api';

dotenv.config();
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
    url,
    port,
    apiPrefix,
    networkPath,
};

export default config;