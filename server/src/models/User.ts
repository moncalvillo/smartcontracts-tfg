// @/models.ts
import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "user",
})
export default class User extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  remember!: boolean;
}