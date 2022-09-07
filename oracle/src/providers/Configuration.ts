import path from "path";

const url = 'http://localhost:8081';
const port = 8081;
const apiPrefix = '/oracle';
const fabricSamplePath = path.join('\\\\wsl.localhost', 'Ubuntu', 'home','pablo', 'tfg','fabric-samples');
const network = 'test-network';


const config = {
    url,
    port,
    apiPrefix,
    fabricSamplePath,
    network,
};

export default config;