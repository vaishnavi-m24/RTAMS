// import { IsDateString, IsNotEmpty } from 'class-validator';

// export class CreateVehicleTransferDto {
  
//   @IsDateString()
//   @IsNotEmpty()
//   vehicleTransferDate: Date;

//   @IsNotEmpty()
//   currentOwnerId: number;

//   @IsNotEmpty()
//   newOwnerId: number;

//   @IsNotEmpty()
//   vehicleId: number;
// }

import { IsString, IsInt, IsNotEmpty, IsOptional, IsDate, IsEnum } from 'class-validator';

export class CreateVehicleDto {
  // @ApiProperty({
  //   description: 'The registration number of the vehicle',
  //   example: 'ABC1234',
  // })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  // @ApiProperty({
  //   description: 'The make of the vehicle',
  //   example: 'Toyota',
  // })
  @IsString()
  @IsNotEmpty()
  make: string;

  // @ApiProperty({
  //   description: 'The model of the vehicle',
  //   example: 'Camry',
  // })
  @IsString()
  @IsNotEmpty()
  model: string;

  // @ApiProperty({
  //   description: 'The year of manufacture',
  //   example: 2020,
  // })
  @IsInt()
  @IsNotEmpty()
  year: number;

  // @ApiProperty({
  //   description: 'The owner ID of the vehicle',
  //   example: 1,
  // })
  @IsInt()
  @IsNotEmpty()
  ownerId: number;

  // @ApiProperty({
  //   description: 'The status of the vehicle',
  //   example: 'Available',
  // })
  @IsString()
  @IsOptional()
  @IsEnum(['Available', 'In Use', 'Under Maintenance'])
  status?: string;

  // @ApiProperty({
  //   description: 'Additional notes about the vehicle',
  //   example: 'This vehicle has a sunroof.',
  // })
  @IsString()
  @IsOptional()
  notes?: string;

  // @ApiProperty({
  //   description: 'The date when the vehicle was registered',
  //   example: '2024-01-01',
  // })
  @IsDate()
  @IsOptional()
  registrationDate?: Date;
}

