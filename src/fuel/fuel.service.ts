import { Injectable } from '@nestjs/common';
import { FuelType } from './fuel.enum';
import { FuelTypeDto } from './fuel.dto';

@Injectable()
export class FuelTypeService {
  getFuelTypes(): FuelTypeDto[] {
    return Object.values(FuelType).map(fuelType => ({ fuelType }));
  }
}
