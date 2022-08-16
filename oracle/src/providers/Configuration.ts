import dotenv from 'dotenv';

const url = 'http://localhost:8081';
const port = 8081;
const apiPrefix = '/oracle';

dotenv.config();
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
    url,
    port,
    apiPrefix,
};

export default config;