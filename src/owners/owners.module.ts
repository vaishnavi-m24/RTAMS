

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './entities/owner.entity';
import { OwnerService } from './owners.service';
import { OwnerController } from './owners.controller';

@Module({
  imports: [SequelizeModule.forFeature([Owner])],  
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService],  
})
export class OwnersModule {}

