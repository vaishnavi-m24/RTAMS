import { IsString, Length, Matches, IsNotEmpty, IsEmail,IsOptional} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Matches(/^[6-9][0-9]{9}$/, { message: 'Mobile number must be an Indian number starting with 6-9' })
  mobileNumber: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}/, {
    message: 'Password must contain uppercase and lowercase letters, numbers, and special characters',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20) 
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state1: string;

  @IsString()
  @Length(6, 6, { message: 'Pincode must be exactly 6 digits' })
  @IsNotEmpty()
  pincode: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
  @IsNotEmpty()
  aadharNumber: string;

  @IsOptional()
  @IsString()
  role:string;

  
}

