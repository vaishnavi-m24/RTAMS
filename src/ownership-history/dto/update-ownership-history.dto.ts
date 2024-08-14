import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateOwnershipHistoryDto {
  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsDateString()
  @IsOptional()
  ownershipStartDate?: Date;

  @IsDateString()
  @IsOptional()
  ownershipEndDate?: Date;

  @IsOptional()
  vehicleId?: number;

  @IsOptional()
  ownerId?: number;
}
