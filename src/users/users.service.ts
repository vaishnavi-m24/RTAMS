// // import { Injectable, BadRequestException } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/sequelize';
// // import { User } from './entities/user.entity';
// // import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';


// // @Injectable()
// // export class UserService {
// //   constructor(
// //     @InjectModel(User)
// //     private userModel: typeof User,
// //   ) {}

  
//   // async createUser(createUserDto: CreateUserDto): Promise<User> {
//   //   const { mobileNumber, password, confirmPassword } = createUserDto;
//   //   const existingUser = this.users.find(user => user.mobileNumber === createUserDto.mobileNumber);
//   //   if (existingUser) {
//   //     throw new BadRequestException('Mobile number already in use');
//   //   }

//   //   if (password !== confirmPassword) {
//   //     throw new BadRequestException('Passwords do not match');
//   //   }

//   //   const hashedPassword = await bcrypt.hash(password, 10);

//   //   const user = new User({
//   //     mobileNumber,
//   //     password: hashedPassword,
//   //   });

//   //   return user.save();
//   // }
// // }

// import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
// import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Injectable()
// export class UserService {
//   private users: User[] = []; // Simulated in-memory database

//   // async createUser(createUserDto: CreateUserDto): Promise<User> {
//   //   const existingUser = this.users.find(user => user.mobileNumber === createUserDto.mobileNumber);
//   //   if (existingUser) {
//   //     throw new BadRequestException('Mobile number already in use');
//   //   }

//   //   const user = new User();
//   //   user.mobileNumber = createUserDto.mobileNumber;
//   //   user.password = createUserDto.password;
//   //   this.users.push(user);
//   //   return user;
//   // }

//   async createUser(createUserDto: CreateUserDto): Promise<User> {
//     const { mobileNumber, password, confirmPassword } = createUserDto;
//     const existingUser = this.users.find(user => user.mobileNumber === createUserDto.mobileNumber);
//     if (existingUser) {
//       throw new BadRequestException('Mobile number already in use');
//     }

//     if (password !== confirmPassword) {
//       throw new BadRequestException('Passwords do not match');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({
//       mobileNumber,
//       password: hashedPassword,
//     });

//     return user.save();
//   }

//   findByMobileNumber(mobileNumber: string): User | undefined {
//     return this.users.find(user => user.mobileNumber === mobileNumber);
//   }

//   findAll(): User[] {
//     return this.users;
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.users.findByPk(id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }
  
//     if (updateUserDto.mobileNumber) {
//       user.mobileNumber = updateUserDto.mobileNumber;
//     }
//     if (updateUserDto.password) {
//       user.password = updateUserDto.password;
//     }
  
//     await user.save();
//     return user;
//   }

//   remove(id: string): void {
//     // Implement remove logic
//   }
// }



import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
    const { mobileNumber, password, confirmPassword } = createUserDto;
    const existingUser = await this.userModel.findOne({ where: { mobileNumber } });
    if (existingUser) {
      throw new BadRequestException('Mobile number already in use');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      mobileNumber,
      password: hashedPassword,
    });

    return user;
  }

  async findByMobileNumber(mobileNumber: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { mobileNumber: mobileNumber.toString() }, // Ensure mobileNumber is a string
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

  
}
