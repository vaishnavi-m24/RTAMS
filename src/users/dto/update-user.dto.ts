import { IsString, Length, Matches, IsOptional, IsEmail} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Matches(/^[6-9][0-9]{9}$/, { message: 'Mobile number must be an Indian number starting with 6-9' })
  @IsOptional()
  mobileNumber?: string;
  
  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}/, {
    message: 'Password must contain uppercase and lowercase letters, numbers, and special characters',
  })
  password?: string;
  
  @IsString()
  @Length(6, 20, { message: 'Confirm password must be between 6 and 20 characters' })
  @IsOptional()
  confirmPassword?: string;

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
  state1?: string;

  @IsString()
  @Length(6, 6, { message: 'Pincode must be exactly 6 digits' })
  @IsOptional()
  pincode?: string;

  @IsEmail({}, { message: 'Invalid email address' })
 @IsOptional()
  email?: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
 @IsOptional()
  aadharNumber?: string;

  @IsOptional()
  @IsString()
  role?:string;

}


