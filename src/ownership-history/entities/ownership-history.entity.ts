import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number;


  @ForeignKey(() => Vehicle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vehicleId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Vehicle)
  vehicle: Vehicle;
}
