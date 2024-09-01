// import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException } from '@nestjs/common';
// import { UserService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';

// @Controller('users')
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('signup')
//   async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
//     // Validate that passwords match
//     if (createUserDto.password !== createUserDto.confirmPassword) {
//       throw new BadRequestException('Password and Confirm Password do not match');
//     }

//     // Check if the mobile number is already taken
//     const existingUser = await this.userService.findByMobileNumber(createUserDto.mobileNumber);
//     if (existingUser) {
//       throw new BadRequestException('Mobile number already in use');
//     }
//     return this.userService.createUser(createUserDto);
//   }


//   @Get(':mobileNumber')
//   findByMobileNumber(@Param('mobileNumber') mobileNumber: string) {
//     return this.userService.findByMobileNumber(mobileNumber);
//   }

//   @Get()
//   findAll() {
//     return this.userService.findAll();
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//     return this.userService.update(id, updateUserDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.userService.remove(id);
//   }
// }



import { Controller, Post, Body, Get, Param, Put, Delete, BadRequestException , UseGuards,Request} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import {Roles} from '../auth/roles.decorator';
import { AdminGuard } from 'src/auth/admin.guard';

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

    // Check if the email is already taken
    const existingEmail = await this.userService.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    // Check if the Aadhar number is already taken
    const existingAadhar = await this.userService.findByAadharNumber(createUserDto.aadharNumber);
    if (existingAadhar) {
      throw new BadRequestException('Aadhar number already in use');
    }

    //assigning  role
    const role = createUserDto.mobileNumber === '9579529955' ? 'admin' : 'user';
    const user = await this.userService.createUser({...createUserDto,role});
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin','user')
  @Get('profile')
  async getProfile(@Request() req){
    const mobileNumber = req.user.mobileNumber;

    const userProfile = await this.userService.findByMobileNumber(mobileNumber);
    if(!userProfile){
      throw new  BadRequestException('User not found');
    }    
    return userProfile;
  }
    

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':mobileNumber')
  async findByMobileNumber(@Param('mobileNumber') mobileNumber: string, @Request() req) {
    if (req.user.role === 'user' && req.user.mobileNumber !== mobileNumber) {
      throw new BadRequestException('You have access to your own profile only');
    }
    return this.userService.findByMobileNumber(mobileNumber);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    if (req.user.role === 'user' && req.user.id !== +id) {
      throw new BadRequestException('You can update your own profile only');
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin','user')
  // @Get(':mobileNumber')
  // findByMobileNumber(@Param('mobileNumber') mobileNumber: string, @Request() req) {
  //   if(req.user.role === 'user' && req.user.mobileNumber!=mobileNumber)
  //   {
  //     throw new BadRequestException('You have access to your own profile only');
  //   }
  //   return this.userService.findByMobileNumber(mobileNumber);
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  // @Get()
  // findAll(){
  //   return this.userService .findAll();
  // }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin','user')
  // @Put(':id')
  // update(@Param('id') id:string,  @Body() updateUserDto: UpdateUserDto, @Request() req){
  //   if(req.user.role === 'user' && req.user.userId !== +id){
  //     throw new BadRequestException('You can update your own profile only');
  //   }
  //   return this.userService.update(id, updateUserDto);
  // }

  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles('admin')
  // @Delete(':id')
  // remove(@Param('id') id:string){
  //   return this.userService.remove(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(id);
  // }
