
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RtoDivision } from './entities/rto-division.entity';
import { RtoDivisionService } from './rto-divisions.service';
import { RtoDivisionController } from './rto-divisions.controller';

@Module({
  imports: [SequelizeModule.forFeature([RtoDivision])],  
  providers: [RtoDivisionService],
  controllers: [RtoDivisionController],
  exports: [RtoDivisionService],  
})
export class RtoDivisionsModule {}

