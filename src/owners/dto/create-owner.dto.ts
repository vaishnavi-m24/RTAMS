import { IsString, IsNotEmpty, IsMobilePhone, Length, IsPostalCode } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  middleName: string;

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
  state: string;

  @IsPostalCode('IN')
  @IsNotEmpty()
  pincode: string;

  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  contactNo: string;

  @IsString()
  @Length(12, 12, { message: 'Aadhar number must be 12 digits long' })
  @IsNotEmpty()
  aadharNo: string;
}
