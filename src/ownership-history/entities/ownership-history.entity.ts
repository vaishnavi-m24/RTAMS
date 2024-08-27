import {Table,Column,Model,DataType,ForeignKey,BelongsTo,} from 'sequelize-typescript';
import { IsString, IsDateString } from 'class-validator';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { Owner } from '../../owners/entities/owner.entity';

@Table({ tableName: 'ownership_histories' })
export class OwnershipHistory extends Model<OwnershipHistory> {
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
  ownerName: string;

  @ForeignKey(() => Vehicle)
  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  registrationNumber: string;

  @IsDateString()
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  ownershipStartDate: Date;

  @IsDateString()
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null
  })
  ownershipEndDate: Date;

  @BelongsTo(() => Vehicle)
  vehicle: Vehicle;

  @ForeignKey(() => Owner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;

  @BelongsTo(() => Owner)
  owner: Owner;
}
