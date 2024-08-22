import { IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Matches(/^[6-9][0-9]{9}$/, { message: 'Mobile number must be an Indian number starting with 6-9' })
  mobileNumber: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsString()
  @Length(6, 20, { message: 'Confirm Password must be between 6 and 20 characters' })
  confirmPassword: string;
}

