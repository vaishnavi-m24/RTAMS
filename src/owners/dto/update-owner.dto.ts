import { IsString, IsOptional, IsMobilePhone, IsPostalCode, Length , IsEmail} from 'class-validator';

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

  @IsString()
  @IsPostalCode()
  @Length(6, 6, { message: 'Pincode must be exactly 6 digits' })
  @IsOptional()
  pincode?: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsOptional()
  email?: string;

  @IsMobilePhone('en-IN', { strictMode: true }, { message: 'Contact number must be an Indian phone number' })
  @IsOptional()
  contactNo?: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
  @IsOptional()
  aadharNo?: string;
}
