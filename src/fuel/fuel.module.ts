import { Module } from '@nestjs/common';
import { FuelTypeController } from './fuel.controller';
import { FuelTypeService } from './fuel.service';

@Module({
  controllers: [FuelTypeController],
  providers: [FuelTypeService],
})
export class FuelTypeModule {}
