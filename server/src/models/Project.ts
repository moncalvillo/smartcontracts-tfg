// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import Type from "./Type";
import User from "./User";

@Table({
  timestamps: false,
  tableName: "project",
  indexes: [
    {
      unique: false,
      fields: ['name'],
    },
  ],
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