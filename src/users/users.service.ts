
// import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import * as bcrypt from 'bcrypt';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User)
//     private readonly userModel: typeof User,
//   ) {}


//   async createUser(createUserDto: CreateUserDto): Promise<User> {
//     const { mobileNumber, password, confirmPassword } = createUserDto;

//     // Check if passwords match
//     if (password !== confirmPassword) {
//       throw new BadRequestException('Passwords do not match');
//     }

//     // Check if the mobile number is already taken
//     const existingUser = await this.userModel.findOne({ where: { mobileNumber } });
//     if (existingUser) {
//       throw new BadRequestException('Mobile number already in use');
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const user = await this.userModel.create({
//       mobileNumber,
//       password: hashedPassword,
//     });

//     return user;
//   }

//   async findByMobileNumber(mobileNumber: string): Promise<User | null> {
//     return this.userModel.findOne({
//       where: { mobileNumber: mobileNumber.toString() }, // Ensure mobileNumber is a string
//     });
//   }

//   // Find all users
//   async findAll(): Promise<User[]> {
//     return this.userModel.findAll();
//   }

//   // Update user details
//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.userModel.findByPk(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
    
//     // Update fields
//     if (updateUserDto.mobileNumber) {
//       user.mobileNumber = updateUserDto.mobileNumber;
//     }
//     if (updateUserDto.password) {
//       user.password = await bcrypt.hash(updateUserDto.password, 10);
//     }
    
//     await user.save();
//     return user;
//   }

//   // Remove a user by ID
//   async remove(id: string): Promise<void> {
//     const user = await this.userModel.findByPk(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
    
//     await user.destroy();
//   }
// }


import { Injectable, BadRequestException, NotFoundException,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      mobileNumber,
      password,
      firstName,
      middleName,
      lastName,
      streetName,
      city,
      state1,
      pincode,
      email,
      aadharNumber,
      role = mobileNumber === '9579529955'?'admin':'user',
    } = createUserDto;

    // Check if the mobile number, email, or Aadhar number is already taken
    const existingUser = await this.userModel.findOne({ where: { mobileNumber } });
    if (existingUser) {
      throw new BadRequestException('Mobile number already in use');
    }

    const existingEmail = await this.userModel.findOne({ where: { email } });
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingAadhar = await this.userModel.findOne({ where: { aadharNumber } });
    if (existingAadhar) {
      throw new BadRequestException('Aadhar number already in use');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create the user
    const user = await this.userModel.create({
      mobileNumber,
      password: hashedPassword,
      firstName,
      middleName,
      lastName,
      streetName,
      city,
      state1,
      pincode,
      email,
      aadharNumber,
      role,
    });

    return user;
  }


  async findByMobileNumber(mobileNumber: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { mobileNumber },
      attributes:[
        'id','mobileNumber','firstName','middleName', 'lastName','streetName','city','state1','pincode','email','aadharNumber','role','password'
      ],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { email },
    });
  }

  async findByAadharNumber(aadharNumber: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { aadharNumber },
    });
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  // Update user details
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update fields
    if (updateUserDto.mobileNumber) {
      user.mobileNumber = updateUserDto.mobileNumber;
    }
    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.middleName) {
      user.middleName = updateUserDto.middleName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.streetName) {
      user.streetName = updateUserDto.streetName;
    }
    if (updateUserDto.city) {
      user.city = updateUserDto.city;
    }
    if (updateUserDto.state1) {
      user.state1 = updateUserDto.state1;
    }
    if (updateUserDto.pincode) {
      user.pincode = updateUserDto.pincode;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.aadharNumber) {
      user.aadharNumber = updateUserDto.aadharNumber;
    }
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }

    await user.save();
    return user;
  }

  // Remove a user by ID
  async remove(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await user.destroy();
  }


  async getUserStats() {
    try {
      const totalUsers = await this.userModel.count();
      console.log(totalUsers);
      return {
        totalUsers,
      };
    } catch (error) {
      console.error('Failed to retrieve dashboard stats:', error.message);
      throw new HttpException('Failed to retrieve dashboard stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}