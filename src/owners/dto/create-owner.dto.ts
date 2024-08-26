
import { IsString, IsNotEmpty, IsOptional, IsMobilePhone, Length,  IsEmail } from 'class-validator';


export class CreateOwnerDto {
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

  @IsMobilePhone('en-IN', { strictMode: false }, { message: 'Contact number must be an Indian phone number' })
  @IsNotEmpty()
  contactNo: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be exactly 12 digits' })
  @IsNotEmpty()
  aadharNo: string;
}
