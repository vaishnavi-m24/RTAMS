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



import { IsInt, IsNotEmpty, IsEnum, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateVehicleTransferDto {
  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsInt()
  @IsNotEmpty()
  currentOwnerId: number;

  @IsString()
  @IsNotEmpty()
  newOwnerMobile: string;
}

export class RespondToVehicleTransferDto {
  @IsEnum(['Accepted', 'Rejected'])
  @IsNotEmpty()
  status: 'Accepted' | 'Rejected';
}

export class ProcessVehicleTransferDto {
  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsInt()
  @IsNotEmpty()
  newOwnerId: number;

  @IsEnum(['Approved', 'Rejected'])
  @IsNotEmpty()
  status: 'Approved' | 'Rejected';
}
