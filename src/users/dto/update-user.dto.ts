import { IsString, Length, Matches, IsOptional } from 'class-validator';

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
}


