// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User)
//     private readonly userModel: typeof User
//   ) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     return this.userModel.create(createUserDto);
//   }

//   async findAll(): Promise<User[]> {
//     return this.userModel.findAll();
//   }

//   async findOne(id: string): Promise<User> {
//     return this.userModel.findByPk(id);
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<[number, User[]]> {
//     return this.userModel.update(updateUserDto, {
//       where: { id },
//       returning: true
//     });
//   }

//   async remove(id: string): Promise<number> {
//     return this.userModel.destroy({ where: { id } });
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
      createUserDto.password = hashedPassword;

      await this.userModel.create(createUserDto);
      return { message: 'User created successfully' };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Updated to find user by mobileNumber
  async findByMobileNumber(mobileNumber: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ where: { mobileNumber } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException('Failed to retrieve user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<{ message: string }> {
    try {
      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt();
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
      }

      const [affectedRows] = await this.userModel.update(updateUserDto, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedRows = await this.userModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
