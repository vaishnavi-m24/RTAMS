
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicles.service';
import { VehicleController } from './vehicles.controller';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle])],  
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],  
})
export class VehiclesModule {}
