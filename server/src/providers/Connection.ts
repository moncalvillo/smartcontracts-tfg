import { Sequelize } from "sequelize-typescript";

import User from "./../models/User"

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: "mysqldb",
  logging: false,
  models: [User],
});

export default connection;