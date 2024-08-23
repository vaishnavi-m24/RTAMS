import { Controller, Get } from '@nestjs/common';
import { FuelTypeService } from './fuel.service';
import { FuelTypeDto } from './fuel.dto';

@Controller('fuelTypes')
export class FuelTypeController {
  constructor(private readonly fuelTypeService: FuelTypeService) {}

  @Get()
  getFuelTypes(): FuelTypeDto[] {
    return this.fuelTypeService.getFuelTypes();
  }
}
