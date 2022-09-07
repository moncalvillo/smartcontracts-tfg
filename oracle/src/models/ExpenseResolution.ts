// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany, HasMany, HasOne, ForeignKey } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "expenseResolution",
})
export default class ExpenseResolution extends Model {
 
  @Column({
      type: DataType.STRING,
      allowNull: false,
      primaryKey: true,
  })
  id!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  })
  owner!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  amount!: Number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  concept!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  currency!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  project!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resolution!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  inspector!: string;

}