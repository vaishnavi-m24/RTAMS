
import { IsString, IsNotEmpty, IsDateString, IsEnum, Matches, IsOptional, IsNumber } from 'class-validator';
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
  state2: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid VIN number' }) // VIN number validation
  vinNumber: string;

  @IsEnum(FuelType)
  @IsNotEmpty()
  fuelType: FuelType;

  @IsNotEmpty()
  rtoDivisionId: number;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsNumber()
  @IsNotEmpty()
  ownerId: number;
}
