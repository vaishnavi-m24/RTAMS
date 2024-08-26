// import {Table,Column,Model,DataType,} from 'sequelize-typescript';
// import { IsString, Length, IsOptional } from 'class-validator';

// @Table({ tableName: 'owners' })
// export class Owner extends Model<Owner> {
//   @Column({
//     type: DataType.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   })
//   id: number;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   firstName: string;

//   @IsString()
//   @IsOptional()
//   @Column({
//     type: DataType.STRING,
//     allowNull: true,
//   })
//   middleName: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   lastName: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   streetName: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   city: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     defaultValue: 'Maharashtra',
//   })
//   state1: string;

//   @IsString()
//   @Length(6, 6, { message: 'Pincode must be exactly 6 digits' })
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   pincode: string;

//   @IsString()
//   @Length(10, 10, { message: 'Contact number must be exactly 10 digits' })
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true,
//   })
//   contactNo: string;

//   @IsString()
//   @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     unique: true,
//   })
//   aadharNo: string;

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     validate: {
//       isEmail: true,
//     },
//   })
//   email: string;
// }

import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { IsString, Length, IsOptional } from 'class-validator';
import * as bcrypt from 'bcrypt';

@Table({ tableName: 'owners' })
export class Owner extends Model<Owner> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  middleName: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  streetName: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Maharashtra',
  })
  state1: string;

  @IsString()
  @Length(6, 6, { message: 'Pincode must be exactly 6 digits' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pincode: string;

  @IsString()
  @Length(10, 10, { message: 'Contact number must be exactly 10 digits' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  contactNo: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  aadharNo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  email: string;

  // Hash the Aadhaar number before creating or updating the record
  @BeforeCreate
  @BeforeUpdate
  static async hashAadhar(instance: Owner) {
    const salt = await bcrypt.genSalt(10);
    instance.aadharNo = await bcrypt.hash(instance.aadharNo, salt);
  }
}