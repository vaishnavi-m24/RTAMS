import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
  import { IsDateString } from 'class-validator';
  import { Vehicle } from '../../vehicles/entities/vehicle.entity';
  import { Owner } from '../../owners/entities/owner.entity';
  
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
  
    @ForeignKey(() => Owner)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    currentOwnerId: number;
  
    @BelongsTo(() => Owner, 'currentOwnerId')
    currentOwner: Owner;
  
    @ForeignKey(() => Owner)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    newOwnerId: number;
  
    @BelongsTo(() => Owner, 'newOwnerId')
    newOwner: Owner;
  
    @ForeignKey(() => Vehicle)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    vehicleId: number;
  
    @BelongsTo(() => Vehicle)
    vehicle: Vehicle;
  }
  