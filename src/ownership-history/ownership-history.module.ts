
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OwnershipHistory } from './entities/ownership-history.entity';
import { OwnershipHistoryService } from './ownership-history.service';
import { OwnershipHistoryController } from './ownership-history.controller';

@Module({
  imports: [SequelizeModule.forFeature([OwnershipHistory])],  
  providers: [OwnershipHistoryService],
  controllers: [OwnershipHistoryController],
  exports: [OwnershipHistoryService],  
})
export class OwnershipHistoryModule {}
