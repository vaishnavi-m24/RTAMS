import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateRTODivisionDto {
  @IsString()
  @Length(4, 5, { message: 'Division code must be 4-5 characters long' })
  @IsNotEmpty()
  divisionCode: string;

  @IsString()
  @IsNotEmpty()
  divisionName: string;
}
