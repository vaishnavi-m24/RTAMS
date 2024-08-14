
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleTransfer } from './entities/vehicle-transfer.entity';
import { VehicleTransferService } from './vehicle-transfer.service';
import { VehicleTransferController } from './vehicle-transfer.controller';

@Module({
  imports: [SequelizeModule.forFeature([VehicleTransfer])],  
  providers: [VehicleTransferService],
  controllers: [VehicleTransferController],
  exports: [VehicleTransferService],  
})
export class VehicleTransferModule {}
