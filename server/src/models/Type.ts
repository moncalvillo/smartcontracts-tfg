// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import ExpenseTypes from "./ExpenseTypes";
import Project from "./Project";

@Table({
  timestamps: false,
  tableName: "type",
})
export default class Type extends Model {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    // @BelongsToMany(() => Project, () => ExpenseTypes)
    // projects!: Project[];

}