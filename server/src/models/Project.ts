// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import ExpenseTypes from "./ExpenseTypes";
import Membership from "./Membership";
import Type from "./Type";
import User from "./User";

@Table({
  timestamps: false,
  tableName: "project",
})
export default class Project extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;
  
  // @BelongsToMany(() => Type, () => ExpenseTypes)
  // types!: Type[];

  // @BelongsToMany(() => User, () => Membership)
  // users!: User[];

}