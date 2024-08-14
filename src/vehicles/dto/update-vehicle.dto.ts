import { IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { FuelType } from '../entities/vehicle.entity'; 

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsDateString()
  @IsOptional()
  yearOfManufacturing?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  vinNumber?: string;

  @IsEnum(FuelType)  
  @IsOptional()
  fuelType: FuelType;

  @IsOptional()
  rtoDivisionId?: number;

  @IsString()
  @IsOptional()
  registrationNumber?: string;
}
