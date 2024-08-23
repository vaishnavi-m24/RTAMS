import { IsString, Length, Matches, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(10, 10, { message: 'Mobile number must be exactly 10 digits' })
  @Matches(/^[6-9][0-9]{9}$/, { message: 'Mobile number must be an Indian number starting with 6-9' })
  mobileNumber: string;

  // @IsNotEmpty()
  // @IsString()
  // @Length(6, 20) // Password must be between 6 and 20 characters
  // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/, {
  //   message: 'Password too weak. It must be 6-20 characters long, include uppercase and lowercase letters, numbers, and special characters.',
  // })
  // password: string;

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
}

