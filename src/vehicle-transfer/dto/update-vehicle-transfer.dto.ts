import { IsDateString, IsOptional } from 'class-validator';

export class UpdateVehicleTransferDto {
  @IsDateString()
  @IsOptional()
  vehicleTransferDate?: Date;

  @IsOptional()
  currentOwnerId?: number;

  @IsOptional()
  newOwnerId?: number;

  @IsOptional()
  vehicleId?: number;
}
