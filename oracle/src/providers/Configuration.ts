import path from "path";
import dotenv from "dotenv";
dotenv.config();
const url = "http://localhost:8081";
const port = 8081;
const apiPrefix = "/oracle";
const fabricSamplePath =
  process.env.FABRIC_SAMPLES_PATH || path.join("fabric-samples");
const network = process.env.NETWORK_NAME || "test-network";
const contractName = process.env.CONTRACT_NAME || "smart-contract";

const config = {
  url,
  port,
  apiPrefix,
  fabricSamplePath,
  network,
  contractName,
};

export default config;
