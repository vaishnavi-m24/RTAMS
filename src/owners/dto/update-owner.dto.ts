import { IsString, IsOptional, IsMobilePhone, IsPostalCode, Length } from 'class-validator';

export class UpdateOwnerDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  streetName?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsPostalCode('IN')
  @IsOptional()
  pincode?: string;

  @IsMobilePhone('en-IN')
  @IsOptional()
  contactNo?: string;

  @IsString()
  @Length(12, 12)
  @IsOptional()
  aadharNo?: string;
}
