import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateOwnershipHistoryDto {
  @IsString()
  @IsOptional()
  ownerName?: string;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsString()
  @IsOptional()
  ownershipStartDate?: Date;

  @IsString()
  @IsOptional()
  ownershipEndDate?: Date;

  // @IsOptional()
  // vehicleId?: number;

  @IsOptional()
  ownerId?: number;
}
