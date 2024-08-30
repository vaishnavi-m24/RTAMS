import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
  import { IsDateString } from 'class-validator';
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
  
    @IsDateString()
    @Column({
      type: DataType.DATE,
      allowNull: false,
    })
    vehicleTransferDate: Date;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    currentOwnerId: number;
  
    @BelongsTo(() => User, 'currentOwnerId')
    currentOwner: User;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    newOwnerId: number;
  
    @BelongsTo(() => User, 'newOwnerId')
    newOwner: User;
  
    @ForeignKey(() => Vehicle)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    vehicleId: number;
  
    @BelongsTo(() => Vehicle)
    vehicle: Vehicle;
  }
  