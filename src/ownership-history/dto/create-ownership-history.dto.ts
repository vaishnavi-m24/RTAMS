import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateOwnershipHistoryDto {
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @IsNotEmpty()
  ownershipStartDate: Date;

  @IsString()
  ownershipEndDate?: Date;

  // @IsNotEmpty()
  // vehicleId: number;

  @IsNotEmpty()
  ownerId: number;
}
