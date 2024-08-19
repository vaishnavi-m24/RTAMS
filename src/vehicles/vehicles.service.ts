// import { Injectable ,HttpException, HttpStatus} from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Vehicle } from './entities/vehicle.entity';
// import { CreateVehicleDto } from './dto/create-vehicle.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';

// @Injectable()
// export class VehicleService {
//   constructor(
//     @InjectModel(Vehicle)
//     private readonly vehicleModel: typeof Vehicle
//   ) {}

//   // async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
//   //   return this.vehicleModel.create(createVehicleDto);
//   // }
//   async create(createVehicleDto: CreateVehicleDto): Promise<{ message: string }> {
//     try {
//       await this.vehicleModel.create(createVehicleDto);
//       return { message: 'Vehicle created successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to create vehicle', HttpStatus.BAD_REQUEST);
//     }
//   }

//   async findAll(): Promise<Vehicle[]> {
//     return this.vehicleModel.findAll();
//   }

//   async findOne(id: string): Promise<Vehicle> {
//     return this.vehicleModel.findByPk(id);
//   }

//   async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<[number, Vehicle[]]> {
//     return this.vehicleModel.update(updateVehicleDto, {
//       where: { id },
//       returning: true
//     });
//   }

//   async remove(id: string): Promise<number> {
//     return this.vehicleModel.destroy({ where: { id } });
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { RtoDivision } from '../rto-divisions/entities/rto-division.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,

    @InjectModel(RtoDivision)
    private readonly rtoDivisionModel: typeof RtoDivision
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<{ message: string; registrationNumber: string }> {
    try {
      const registrationNumber = await this.generateRegistrationNumber(createVehicleDto.rtoDivisionId);
      const vehicle = await this.vehicleModel.create({
        ...createVehicleDto,
        registrationNumber,
      });
      return { message: 'Vehicle created successfully', registrationNumber: vehicle.registrationNumber };
    } catch (error) {
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        throw new HttpException('Invalid RTO Division ID', HttpStatus.BAD_REQUEST);
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException('Vehicle with this VIN number already exists', HttpStatus.BAD_REQUEST);
      }
      console.error('Error creating vehicle:', error);
      throw new HttpException('Failed to create vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async generateRegistrationNumber(rtoDivisionId: number): Promise<string> {
    const rtoDivision = await this.rtoDivisionModel.findByPk(rtoDivisionId);
    if (!rtoDivision) {
      throw new HttpException('Invalid RTO Division ID', HttpStatus.BAD_REQUEST);
    }

    const rtoDivisionCode = rtoDivision.divisionCode; // using divisionCode directly from the RtoDivision entity
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

  // Other methods remain unchanged
  async findAll(): Promise<Vehicle[]> {
    try {
      return await this.vehicleModel.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
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
      const deletedRows = await this.vehicleModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Vehicle deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
