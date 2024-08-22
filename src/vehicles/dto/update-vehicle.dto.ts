
import { IsString, IsOptional, IsDateString, IsEnum, Matches } from 'class-validator';
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
  state2?: string;

  @IsString()
  @IsOptional()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid VIN number' }) // VIN number validation
  vinNumber?: string;

  @IsEnum(FuelType)
  @IsOptional()
  fuelType?: FuelType;

  @IsOptional()
  rtoDivisionId?: number;

  @IsString()
  @IsOptional()
  registrationNumber?: string;
}
