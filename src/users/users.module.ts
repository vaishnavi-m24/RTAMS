import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])], 
  providers: [UserService], 
  controllers: [UserController],
  exports: [UserService], 
})
export class UsersModule {}
