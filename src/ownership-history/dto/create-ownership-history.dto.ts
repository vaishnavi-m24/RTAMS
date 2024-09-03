
import { IsString, IsNotEmpty, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

export class CreateOwnershipHistoryDto {
  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  // @Validate(IsDateFormat)
  @IsNotEmpty()
  ownershipStartDate: string;

  // @Validate(IsDateFormat)
  ownershipEndDate?: string;

  @IsNotEmpty()
  ownerId: number;

  @IsNotEmpty()
  vehicleId:number;
}
