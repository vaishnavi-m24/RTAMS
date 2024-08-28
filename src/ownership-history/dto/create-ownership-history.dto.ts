// import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

// export class CreateOwnershipHistoryDto {
//   @IsString()
//   @IsNotEmpty()
//   ownerName: string;

//   @IsString()
//   @IsNotEmpty()
//   registrationNumber: string;

//   @IsString()
//   @IsNotEmpty()
//   ownershipStartDate: string;

//   @IsString()
//   ownershipEndDate: string;

//   @IsNotEmpty()
//   ownerId: number;
// }

import { IsString, IsNotEmpty, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as moment from 'moment';

// @ValidatorConstraint({ name: 'isDateFormat', async: false })
// export class IsDateFormat implements ValidatorConstraintInterface {
//   validate(date: string, args: ValidationArguments) {
//     return moment(date, 'DD/MM/YYYY', true).isValid();
//   }

//   defaultMessage(args: ValidationArguments) {
//     return 'Date must be in the format DD/MM/YYYY';
//   }
// }

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
}
