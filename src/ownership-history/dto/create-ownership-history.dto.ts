import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateOwnershipHistoryDto {
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsDateString()
  @IsNotEmpty()
  ownershipStartDate: Date;

  @IsDateString()
  @IsNotEmpty()
  ownershipEndDate?: Date;

  // @IsNotEmpty()
  // vehicleId: number;

  @IsNotEmpty()
  ownerId: number;
}
