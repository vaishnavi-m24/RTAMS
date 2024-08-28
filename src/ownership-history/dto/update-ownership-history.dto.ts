import { IsString, IsOptional,Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'isDateFormat', async: false })
export class IsDateFormat implements ValidatorConstraintInterface {
  validate(date: string, args: ValidationArguments) {
    return moment(date, 'DD/MM/YYYY', true).isValid();
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date must be in the format DD/MM/YYYY';
  }
}

export class UpdateOwnershipHistoryDto {
  @IsString()
  @IsOptional()
  ownerName: string;

  @IsString()
  @IsOptional()
  registrationNumber: string;

  @Validate(IsDateFormat)
  @IsOptional()
  ownershipStartDate: string;

  @Validate(IsDateFormat)
  ownershipEndDate?: string;

  @IsOptional()
  ownerId: number;
}
