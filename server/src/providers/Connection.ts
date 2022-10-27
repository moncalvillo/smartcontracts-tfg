import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import Project from "../models/Project";
import Type from "../models/Type";

import User from "./../models/User"

import config from './Configuration';

const {database_options} = config;
const {host, port, user, password, database, dialect} = database_options;
const connection: any  = new Sequelize(database, user,password,{
  dialect: dialect as Dialect,
  host: host,
  port: port,
  logging: false,
  models: [User, Type, Project],
});

export default connection;