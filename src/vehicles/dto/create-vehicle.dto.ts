// import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';


// export class CreateVehicleDto {
//   @IsString()
//   @IsNotEmpty()
//   make: string;

//   @IsString()
//   @IsNotEmpty()
//   model: string;

//   @IsDateString()
//   @IsNotEmpty()
//   yearOfManufacturing: string;

//   @IsString()
//   @IsNotEmpty()
//   color: string;

//   @IsString()
//   @IsNotEmpty()
//   vinNumber: string;

//   @IsEnum(['petrol', 'diesel', 'CNG', 'LPG', 'electric'])
//   @IsNotEmpty()
//   fuelType: string;

//   @IsNotEmpty()
//   rtoDivisionId: number;

//   @IsString()
//   @IsNotEmpty()
//   registrationNumber: string;
// }
import { IsString, IsNotEmpty, IsDateString, IsEnum } from 'class-validator';
import { FuelType } from '../entities/vehicle.entity'; 

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsDateString()
  @IsNotEmpty()
  yearOfManufacturing: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  vinNumber: string;

  @IsEnum(FuelType)  
  @IsNotEmpty()
  fuelType: FuelType;  

  @IsNotEmpty()
  rtoDivisionId: number;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;
}
