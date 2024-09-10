// import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
//   import { IsDateString } from 'class-validator';
//   import { Vehicle } from '../../vehicles/entities/vehicle.entity';
//   import { User } from '../../users/entities/user.entity';
  
//   @Table({ tableName: 'vehicle_transfers' })
//   export class VehicleTransfer extends Model<VehicleTransfer> {
//     @Column({
//       type: DataType.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     })
//     id: number;
  
//     @IsDateString()
//     @Column({
//       type: DataType.DATE,
//       allowNull: false,
//     })
//     vehicleTransferDate: Date;
  
//     @ForeignKey(() => User)
//     @Column({
//       type: DataType.INTEGER,
//       allowNull: false,
//     })
//     currentOwnerId: number;
  
//     @BelongsTo(() => User, 'currentOwnerId')
//     currentOwner: User;
  
//     @ForeignKey(() => User)
//     @Column({
//       type: DataType.INTEGER,
//       allowNull: false,
//     })
//     newOwnerId: number;
  
//     @BelongsTo(() => User, 'newOwnerId')
//     newOwner: User;
  
//     @ForeignKey(() => Vehicle)
//     @Column({
//       type: DataType.INTEGER,
//       allowNull: false,
//     })
//     vehicleId: number;
  
//     @BelongsTo(() => Vehicle)
//     vehicle: Vehicle;
//   }
  
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'vehicle_transfers' })
export class VehicleTransfer extends Model<VehicleTransfer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => Vehicle)
  vehicleId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  currentOwnerId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @ForeignKey(() => User)
  newOwnerId: number;

  @Column({
    type: DataType.ENUM('Pending', 'Accepted', 'Rejected', 'Approved'),
    allowNull: true, // Allow null if no requests are made
  })
  status: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  requestDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  rejectedDate: Date | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  approvedDate: Date | null;

  @BelongsTo(() => Vehicle)
  vehicle: Vehicle;

  @BelongsTo(() => User, { foreignKey: 'currentOwnerId' })
  currentOwner: User;

  @BelongsTo(() => User, { foreignKey: 'newOwnerId' })
  newOwner: User;
}
