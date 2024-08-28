// import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
// import { IsString, IsDateString } from 'class-validator';
// import { Vehicle } from '../../vehicles/entities/vehicle.entity';
// import { Owner } from '../../owners/entities/owner.entity';

// @Table({ tableName: 'ownership_histories' })
// export class OwnershipHistory extends Model<OwnershipHistory> {
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
//   ownerName: string;

//   @ForeignKey(() => Vehicle)
//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   registrationNumber: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//   ownershipStartDate: string;

//   @IsString()
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//     defaultValue: '---'
//   })
//   ownershipEndDate: string;

//   @BelongsTo(() => Vehicle)
//   vehicle: Vehicle;

//   @ForeignKey(() => Owner)
//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false,
//   })
//   ownerId: number;

//   @BelongsTo(() => Owner)
//   owner: Owner;
// }


import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Owner } from '../../owners/entities/owner.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';

@Table({ tableName: 'ownership_histories' })
export class OwnershipHistory extends Model<OwnershipHistory> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ownerName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  registrationNumber: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ownershipStartDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  ownershipEndDate: Date;

  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  
  // @ForeignKey(() => Vehicle)
  //   @Column({
  //     type: DataType.INTEGER,
  //     allowNull: false,
  //   })
  //   vehicleId: number;

  @BelongsTo(() => Owner)
  owner: Owner;
}
