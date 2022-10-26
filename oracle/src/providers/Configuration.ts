import path from "path";
import dotenv from 'dotenv';
dotenv.config();
const url = 'http://localhost:8081';
const port = 8081;
const apiPrefix = '/oracle';
const fabricSamplePath = process.env.FABRIC_SAMPLES_PATH;
const network = process.env.NETWORK_PATH;


const config = {
    url,
    port,
    apiPrefix,
    fabricSamplePath,
    network,
};

export default config;