// @/models.ts
import { Table, Model, Column, DataType, BelongsToMany, HasMany, HasOne, ForeignKey } from "sequelize-typescript";
// import Project from "./Project";
// import Membership from "./Membership";
// import Role from "./Role";

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

  // @BelongsToMany(() => Project, { as: 'projects', through: () => Membership })
  // projects!: Project[];

  // @ForeignKey(() => Role)
  // @Column({
  //   type: DataType.STRING,
  //   field: 'roleType'
  // })
  // roleType!: string;

}