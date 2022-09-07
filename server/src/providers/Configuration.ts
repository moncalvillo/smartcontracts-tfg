import dotenv from 'dotenv';
import path from "path";

const url = 'http://localhost:8080';
const port = 8080;
const fabricSamplePath = path.join('\\\\wsl.localhost', 'Ubuntu', 'home','pablo', 'tfg','fabric-samples');
const apiPrefix = '/api';
const network = 'test-network';

dotenv.config();
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
    url,
    port,
    apiPrefix,
    fabricSamplePath,
    network,
};

export default config;