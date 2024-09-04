// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Vehicle } from './entities/vehicle.entity';
// import { CreateVehicleDto } from './dto/create-vehicle.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';
// import { RtoDivision } from '../rto-divisions/entities/rto-division.entity';
// import { vin } from '@form-validation/validator-vin';
// import { User } from 'src/users/entities/user.entity';

// @Injectable()
// export class VehicleService {
//   constructor(
//     @InjectModel(Vehicle)
//     private readonly vehicleModel: typeof Vehicle,

//     @InjectModel(RtoDivision)
//     private readonly rtoDivisionModel: typeof RtoDivision,
//   ) {}

//   async create(createVehicleDto: CreateVehicleDto): Promise<{ message: string; registrationNumber: string }> {
//     try {
//       // Validate the VIN number
//       const vinValidationResult = vin().validate({
//         value: createVehicleDto.vinNumber,
//         options: {
//           message: 'Invalid VIN number',
//         },
//       });

//       if (!vinValidationResult.valid) {
//         console.log(vinValidationResult);
//         throw new HttpException(vinValidationResult.message, HttpStatus.BAD_REQUEST);
//       }

//       // Check if VIN is unique
//       const existingVehicle = await this.vehicleModel.findOne({
//         where: { vinNumber: createVehicleDto.vinNumber },
//       });

//       if (existingVehicle) {
//         //console.log(existingVehicle);
//         throw new HttpException('Vehicle with this VIN number already exists', HttpStatus.BAD_REQUEST);
//       }

//       // Generate registration number
//       const registrationNumber = await this.generateRegistrationNumber(createVehicleDto.rtoDivisionId);

//       // Create the vehicle
//       const vehicle = await this.vehicleModel.create({
//         ...createVehicleDto,
//         registrationNumber,
//       });

//       return { message: 'Vehicle created successfully', registrationNumber: vehicle.registrationNumber };
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }

//       console.error('Error creating vehicle:', error.message || error);

//       throw new HttpException(
//         {
//           message: 'Failed to create vehicle',
//           error: error.message || 'An unexpected error occurred',
//         },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   private async generateRegistrationNumber(rtoDivisionId: number): Promise<string> {
//     const rtoDivision = await this.rtoDivisionModel.findByPk(rtoDivisionId);
//     if (!rtoDivision) {
//       throw new HttpException('Invalid RTO Division ID', HttpStatus.BAD_REQUEST);
//     }

//     const rtoDivisionCode = rtoDivision.divisionCode;
//     const randomLetters = this.generateRandomLetters();
//     const uniqueNumber = await this.generateUniqueNumber(rtoDivisionId);

//     return `${rtoDivisionCode}${randomLetters}${uniqueNumber}`;
//   }

//   private generateRandomLetters(): string {
//     const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     return Array(2)
//       .fill('')
//       .map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
//       .join('');
//   }

//   private async generateUniqueNumber(rtoDivisionId: number): Promise<string> {
//     const latestVehicle = await this.vehicleModel.findOne({
//       where: { rtoDivisionId },
//       order: [['createdAt', 'DESC']],
//     });

//     const lastNumber = latestVehicle ? parseInt(latestVehicle.registrationNumber.slice(-4)) : 0;
//     const nextNumber = lastNumber + 1;
//     return nextNumber.toString().padStart(4, '0');
//   }

//   async findAll(user:User): Promise<Vehicle[]> {
//     try {
//       if(user.role === 'admin'){
//         return await this.vehicleModel.findAll();
//       }
//       else{
//         return await this.vehicleModel.findAll({
//           where: {ownerId: user.id},
//         });
//       }
      
//     } catch (error) {
//       console.log(error);
//       throw new HttpException('Failed to retrieve vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async findOne(id: string, user: User): Promise<Vehicle> {
//     try {
//       const vehicle = await this.vehicleModel.findByPk(id);
//       if (!vehicle) {
//         throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
//       }
  
//       if(user.role !=='admin' && vehicle.ownerId !== user.id)
//       {
//         throw new HttpException('Access denied',HttpStatus.FORBIDDEN);
//       }
//       return vehicle;
//     } catch (error) {
//       throw new HttpException('Failed to retrieve vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<{ message: string }> {
//     try {
//       const [affectedRows] = await this.vehicleModel.update(updateVehicleDto, {
//         where: { id },
//         returning: true,
//       });
//       if (affectedRows === 0) {
//         throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
//       }
//       return { message: 'Vehicle updated successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to update vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async remove(id: string): Promise<{ message: string }> {
//     try {
//       const deleted = await this.vehicleModel.destroy({
//         where: { id },
//       });
//       if (deleted === 0) {
//         throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
//       }
//       return { message: 'Vehicle removed successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to delete vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }


import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { RtoDivision } from '../rto-divisions/entities/rto-division.entity';
import { vin } from '@form-validation/validator-vin';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,

    @InjectModel(RtoDivision)
    private readonly rtoDivisionModel: typeof RtoDivision,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<{ message: string; registrationNumber: string; vehicleId:number }> {
    try {
      // Validating the VIN number
      const vinValidationResult = vin().validate({
        value: createVehicleDto.vinNumber,
        options: {
          message: 'Invalid VIN number',
        },
      });

      if (!vinValidationResult.valid) {
        console.log(vinValidationResult);
        throw new HttpException(vinValidationResult.message, HttpStatus.BAD_REQUEST);
      }

      // Checking if VIN is unique
      const existingVehicle = await this.vehicleModel.findOne({
        where: { vinNumber: createVehicleDto.vinNumber },
      });

      if (existingVehicle) {
        throw new HttpException('Vehicle with this VIN number already exists', HttpStatus.BAD_REQUEST);
      }

      // Generating registration number
      const registrationNumber = await this.generateRegistrationNumber(createVehicleDto.rtoDivisionId);

      // Create the vehicle
      const vehicle = await this.vehicleModel.create({
        ...createVehicleDto,
        registrationNumber,
      });

      return { message: 'Vehicle created successfully', registrationNumber: vehicle.registrationNumber, vehicleId:vehicle.id };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error creating vehicle:', error.message || error);

      throw new HttpException(
        {
          message: 'Failed to create vehicle',
          error: error.message || 'An unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateRegistrationNumber(rtoDivisionId: number): Promise<string> {
    const rtoDivision = await this.rtoDivisionModel.findByPk(rtoDivisionId);
    if (!rtoDivision) {
      throw new HttpException('Invalid RTO Division ID', HttpStatus.BAD_REQUEST);
    }

    const rtoDivisionCode = rtoDivision.divisionCode;
    const randomLetters = this.generateRandomLetters();
    const uniqueNumber = await this.generateUniqueNumber(rtoDivisionId);

    return `${rtoDivisionCode}${randomLetters}${uniqueNumber}`;
  }

  private generateRandomLetters(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array(2)
      .fill('')
      .map(() => letters.charAt(Math.floor(Math.random() * letters.length)))
      .join('');
  }

  private async generateUniqueNumber(rtoDivisionId: number): Promise<string> {
    const latestVehicle = await this.vehicleModel.findOne({
      where: { rtoDivisionId },
      order: [['createdAt', 'DESC']],
    });

    const lastNumber = latestVehicle ? parseInt(latestVehicle.registrationNumber.slice(-4)) : 0;
    const nextNumber = lastNumber + 1;
    return nextNumber.toString().padStart(4, '0');
  }

  async findAll(user: User): Promise<Vehicle[]> {
    try {
      if (user.role === 'admin') {
        return await this.vehicleModel.findAll();
      } else {
        return await this.vehicleModel.findAll({
          where: { ownerId: user.id },
        });
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to retrieve vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string, user: User): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }

      if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }

      return vehicle;
    } catch (error) {
      throw new HttpException('Failed to retrieve vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<{ message: string }> {
    try {
      const [affectedRows] = await this.vehicleModel.update(updateVehicleDto, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Vehicle updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deleted = await this.vehicleModel.destroy({
        where: { id },
      });
      if (deleted === 0) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Vehicle removed successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
