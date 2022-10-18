// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany } from "sequelize-typescript";
import Project from "./Project";

@Table({
  timestamps: false,
  tableName: "type",
  indexes: [
    {
      unique: false,
      fields: ['name'],
    },
  ],
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