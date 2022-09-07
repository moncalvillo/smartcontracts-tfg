import { Sequelize } from "sequelize-typescript";
import ExpenseResolution from "../models/ExpenseResolution";



const connection: Sequelize  = new Sequelize('oracledb', 'root','root',{
  dialect: "mysql",
  host: "localhost",
  port: 3307,
  logging: false,
  models: [ExpenseResolution],
});

export default connection;