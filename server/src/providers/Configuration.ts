import dotenv from "dotenv";
import path from "path";
dotenv.config();

const url = "http://localhost:8080";
const port = 8080;

const fabricSamplePath =
  process.env.FABRIC_SAMPLES_PATH || path.join("fabric-samples");
const apiPrefix = "/api";
const network = process.env.NETWORK_PATH || "test-network";
const contractName = process.env.CONTRACT_NAME || "chaincode";
const populate = Boolean(process.env.INIT_POPULATE) || false;
const database_options = {
  host: process.env.DATABASE_HOST || "localhost",
  port: Number(process.env.DATABASE_PORT) || 3306,
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "root",
  database: process.env.DATABASE_NAME || "mysqldb",
  dialect: process.env.DATABASE_DIALECT || "mysql",
};
export const JWT_SECRET = process.env.TOKEN_SECRET;

const config = {
  database_options,
  url,
  port,
  apiPrefix,
  fabricSamplePath,
  network,
  contractName,
  populate,
};

export default config;
