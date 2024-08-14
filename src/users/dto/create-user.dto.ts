import { IsString, IsMobilePhone, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {

  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  mobileNo: string;

  @IsString()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  @IsNotEmpty()
  password: string;
}
