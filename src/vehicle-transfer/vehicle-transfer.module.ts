
// import { Module } from '@nestjs/common';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { VehicleTransfer } from './entities/vehicle-transfer.entity';
// import { VehicleTransferService } from './vehicle-transfer.service';
// import { VehicleTransferController } from './vehicle-transfer.controller';

// @Module({
//   imports: [SequelizeModule.forFeature([VehicleTransfer])],  
//   providers: [VehicleTransferService],
//   controllers: [VehicleTransfer],
//   exports: [VehicleTransferService],  
// })
// export class VehicleTransferModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VehicleTransfer } from './entities/vehicle-transfer.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { User } from '../users/entities/user.entity';
import { OwnershipHistory } from '../ownership-history/entities/ownership-history.entity';
import { VehicleTransferService } from './vehicle-transfer.service';
import { VehicleTransferController } from './vehicle-transfer.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([VehicleTransfer, Vehicle, User, OwnershipHistory]),
  ],
  providers: [VehicleTransferService],
  controllers: [VehicleTransferController],
  exports: [VehicleTransferService],
})
export class VehicleTransferModule {}

