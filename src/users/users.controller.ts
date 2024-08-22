import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    // Validate that passwords match
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Password and Confirm Password do not match');
    }

    // Check if the mobile number is already taken
    const existingUser = await this.userService.findByMobileNumber(createUserDto.mobileNumber);
    if (existingUser) {
      throw new BadRequestException('Mobile number already in use');
    }
    return this.userService.createUser(createUserDto);
  }

  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.createUser(createUserDto);
  // }

  @Get(':mobileNumber')
  findByMobileNumber(@Param('mobileNumber') mobileNumber: string) {
    return this.userService.findByMobileNumber(mobileNumber);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
