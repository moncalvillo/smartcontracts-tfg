// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany, HasMany, HasOne, ForeignKey } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "user",
})
export default class User extends Model {
 
  @Column({
      type: DataType.INTEGER,
      allowNull: false,
      primaryKey: true,
  })
  id!: Number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
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
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  roleType!: string;

  // @BelongsToMany(() => Project, { as: 'projects', through: () => Membership })
  // projects!: Project[];

  // @ForeignKey(() => Role)
  // @Column({
  //   type: DataType.STRING,
  //   field: 'roleType'
  // })
  // roleType!: string;

}