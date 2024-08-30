import { Table, Column, Model, DataType, AllowNull, HasMany } from 'sequelize-typescript';
import { IsString, Length, IsOptional, IsEmail } from 'class-validator';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { OwnershipHistory } from 'src/ownership-history/entities/ownership-history.entity';
import { VehicleTransfer } from 'src/vehicle-transfer/entities/vehicle-transfer.entity';

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

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull:false,
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @Column({
    type: DataType.STRING,
    allowNull:true,
  })
  middleName: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull:false,
  })
  lastName: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  streetName:string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city:string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Maharashtra',
  })
  state1:string;

  @IsString()
  @Length(6,6,{message:'Pincode should contain exactly 6 digits'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pincode:string;

  @IsEmail({},{message: 'Invalid email address'})
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email:string;

  @IsString()
  @Length(12,12,{message:'Aadhar number should contain exactly 12 digits'})
  @Column({
    type:DataType.STRING,
    allowNull:false,
    unique: true,
  })
  aadharNumber: string;

  @IsString()
  @Column({
    type: DataType.ENUM('user','admin'),
    allowNull: false,
    defaultValue: 'user',
  })
  role: string;

  @HasMany(() =>Vehicle)
  vehicles: Vehicle[];

  @HasMany(() => OwnershipHistory)
  ownershipHistories: OwnershipHistory[];

  //vehicle-transfer

}
