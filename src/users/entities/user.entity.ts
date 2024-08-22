import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, Length } from 'class-validator';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @IsString()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
  })
  mobileNumber: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
