import dotenv from 'dotenv';

const url = 'http://localhost:8080';
const port = 8080;

const apiPrefix = '/api';

dotenv.config();
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
    url,
    port,
    apiPrefix,
};

export default config;