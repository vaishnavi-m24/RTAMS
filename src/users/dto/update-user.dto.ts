import { IsString, IsOptional, IsMobilePhone, Length } from 'class-validator';

export class UpdateUserDto {
  
  @IsMobilePhone('en-IN')
  @IsOptional()
  mobileNo?: string;

  @IsString()
  @Length(6, 20)
  @IsOptional()
  password?: string;
}
