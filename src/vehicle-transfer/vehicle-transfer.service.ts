// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { VehicleTransfer } from './entities/vehicle-transfer.entity';
// import { CreateVehicleTransferDto } from './dto/create-vehicle-transfer.dto';
// import { UpdateVehicleTransferDto } from './dto/update-vehicle-transfer.dto';

// @Injectable()
// export class VehicleTransferService {
//   constructor(
//     @InjectModel(VehicleTransfer)
//     private readonly vehicleTransferModel: typeof VehicleTransfer
//   ) {}

//   async create(createVehicleTransferDto: CreateVehicleTransferDto): Promise<VehicleTransfer> {
//     return this.vehicleTransferModel.create(createVehicleTransferDto);
//   }

//   async findAll(): Promise<VehicleTransfer[]> {
//     return this.vehicleTransferModel.findAll();
//   }

//   async findOne(id: string): Promise<VehicleTransfer> {
//     return this.vehicleTransferModel.findByPk(id);
//   }

//   async update(id: string, updateVehicleTransferDto: UpdateVehicleTransferDto): Promise<[number, VehicleTransfer[]]> {
//     return this.vehicleTransferModel.update(updateVehicleTransferDto, {
//       where: { id },
//       returning: true
//     });
//   }

//   async remove(id: string): Promise<number> {
//     return this.vehicleTransferModel.destroy({ where: { id } });
//   }
// }

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VehicleTransfer } from './entities/vehicle-transfer.entity';
import { CreateVehicleTransferDto } from './dto/create-vehicle-transfer.dto';
import { UpdateVehicleTransferDto } from './dto/update-vehicle-transfer.dto';

@Injectable()
export class VehicleTransferService {
  constructor(
    @InjectModel(VehicleTransfer)
    private readonly vehicleTransferModel: typeof VehicleTransfer
  ) {}

  async create(createVehicleTransferDto: CreateVehicleTransferDto): Promise<{ message: string }> {
    try {
      await this.vehicleTransferModel.create(createVehicleTransferDto);
      return { message: 'Vehicle transfer created successfully' };
    } catch (error) {
      throw new HttpException('Failed to create vehicle transfer', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<VehicleTransfer[]> {
    try {
      return await this.vehicleTransferModel.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve vehicle transfers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<VehicleTransfer> {
    try {
      const vehicleTransfer = await this.vehicleTransferModel.findByPk(id);
      if (!vehicleTransfer) {
        throw new HttpException('Vehicle transfer not found', HttpStatus.NOT_FOUND);
      }
      return vehicleTransfer;
    } catch (error) {
      throw new HttpException('Failed to retrieve vehicle transfer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateVehicleTransferDto: UpdateVehicleTransferDto): Promise<{ message: string }> {
    try {
      const [affectedRows] = await this.vehicleTransferModel.update(updateVehicleTransferDto, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        throw new HttpException('Vehicle transfer not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Vehicle transfer updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update vehicle transfer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedRows = await this.vehicleTransferModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('Vehicle transfer not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Vehicle transfer deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete vehicle transfer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
