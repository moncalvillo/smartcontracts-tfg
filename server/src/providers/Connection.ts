import { Sequelize } from "sequelize-typescript";
import Project from "../models/Project";
import Type from "../models/Type";

import User from "./../models/User"

const connection: any  = new Sequelize('mysqldb', 'root','root',{
  dialect: "mysql",
  host: "localhost",
  logging: false,
  models: [User, Type, Project],
});

export default connection;