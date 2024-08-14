import { IsString, IsOptional, Length } from 'class-validator';

export class UpdateRTODivisionDto {
  @IsString()
  @Length(4, 5)
  @IsOptional()
  divisionCode?: string;

  @IsString()
  @IsOptional()
  divisionName?: string;
}
