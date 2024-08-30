import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { IsString, IsEnum, Matches, ValidateIf ,IsOptional } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { RtoDivision } from '../../rto-divisions/entities/rto-division.entity';

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  CNG = 'CNG',
  LPG = 'LPG',
  ELECTRIC = 'Electric',
}

@Table({ tableName: 'vehicles' })
export class Vehicle extends Model<Vehicle> {
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
  make: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @ValidateIf((o) => o.yearOfManufacturing <= new Date().getFullYear())
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  yearOfManufacturing: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @IsEnum(FuelType, { message: 'Invalid fuel type' })
  @Column({
    type: DataType.ENUM('Petrol', 'Diesel', 'CNG', 'LPG', 'Electric'),
    allowNull: false,
  })
  fuelType: FuelType;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Maharashtra',
  })
  state2: string;

  @IsString()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid VIN number' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  vinNumber: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => RtoDivision)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  rtoDivisionId: number;

  @BelongsTo(() => RtoDivision)
  division: RtoDivision;

  @IsOptional()
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  registrationNumber: string;

}
