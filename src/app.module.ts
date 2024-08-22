import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { OwnershipHistoryModule } from './ownership-history/ownership-history.module';
import { VehicleTransferModule } from './vehicle-transfer/vehicle-transfer.module';
import { RtoDivisionsModule } from './rto-divisions/rto-divisions.module';
import { OwnersModule } from './owners/owners.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';


@Module({
  imports: [SequelizeModule.forRoot(databaseConfig),UsersModule, VehiclesModule, OwnershipHistoryModule, VehicleTransferModule, RtoDivisionsModule, OwnersModule, AuthModule,User],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


