import {Table,Column,Model,DataType,} from 'sequelize-typescript';
import { IsString, Length } from 'class-validator';

@Table({ tableName: 'rto_divisions',
  timestamps: false,
 })

export class RtoDivision extends Model<RtoDivision> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @IsString()
  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    unique: true,
  })
  divisionCode: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  divisionName: string;
}
