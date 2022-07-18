import { Sequelize } from "sequelize-typescript";
import ExpenseTypes from "../models/ExpenseTypes";
import Membership from "../models/Membership";
import Project from "../models/Project";
import Role from "../models/Role";
import Type from "../models/Type";

import User from "./../models/User"

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: "mysqldb",
  logging: false,
  models: [User, Type, Project],
});

export default connection;