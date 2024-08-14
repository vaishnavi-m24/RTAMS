import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateVehicleTransferDto {
  @IsDateString()
  @IsNotEmpty()
  vehicleTransferDate: Date;

  @IsNotEmpty()
  currentOwnerId: number;

  @IsNotEmpty()
  newOwnerId: number;

  @IsNotEmpty()
  vehicleId: number;
}
