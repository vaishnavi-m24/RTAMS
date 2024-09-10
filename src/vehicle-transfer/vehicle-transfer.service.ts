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
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { User } from 'src/users/entities/user.entity';
import { OwnershipHistory } from 'src/ownership-history/entities/ownership-history.entity';

@Injectable()
export class VehicleTransferService {
  constructor(
    @InjectModel(VehicleTransfer)
    private readonly vehicleTransferModel: typeof VehicleTransfer,

    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle,

    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(OwnershipHistory)
    private readonly ownershipHistoryModel: typeof OwnershipHistory,
  ) {}

  async requestTransfer(vehicleId: number, currentOwnerId: number, newOwnerMobile: string): Promise<{ message: string }> {
    const vehicle = await this.vehicleModel.findByPk(vehicleId);

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    if (vehicle.ownerId !== currentOwnerId) {
      throw new HttpException('Unauthorized transfer request', HttpStatus.FORBIDDEN);
    }

    const newOwner = await this.userModel.findOne({ where: { mobileNumber: newOwnerMobile } });

    if (!newOwner) {
      throw new HttpException('Buyer is not registered', HttpStatus.BAD_REQUEST);
    }

    await this.vehicleTransferModel.create({
      vehicleId,
      currentOwnerId,
      newOwnerId: newOwner.id,
      status: 'Pending',
      requestDate: new Date(),
    });

    return { message: 'Transfer request submitted successfully' };
  }

  async respondToTransfer(vehicleId: number, newOwnerId: number, status: 'Accepted' | 'Rejected'): Promise<{ message: string }> {
    const transfer = await this.vehicleTransferModel.findOne({
      where: { vehicleId, newOwnerId, status: 'Pending' },
    });

    if (!transfer) {
      throw new HttpException('Transfer request not found', HttpStatus.NOT_FOUND);
    }

    if (status === 'Rejected') {
      await transfer.update({
        status: 'Rejected',
        rejectedDate: new Date(),
      });
      return { message: 'Transfer request rejected' };
    }

    // If accepted, the status remains 'Pending' until admin approves
    await transfer.update({
      status: 'Accepted',
    });

    return { message: 'Transfer request accepted' };
  }

  async processTransferByAdmin(vehicleId: number, newOwnerId: number, status: 'Approved' | 'Rejected'): Promise<{ message: string }> {
    const transfer = await this.vehicleTransferModel.findOne({
      where: { vehicleId, newOwnerId, status: 'Accepted' },
    });

    if (!transfer) {
      throw new HttpException('Transfer request not found or not pending', HttpStatus.NOT_FOUND);
    }

    if (status === 'Rejected') {
      await transfer.update({
        status: 'Rejected',
        rejectedDate: new Date(),
      });
      return { message: 'Transfer request rejected' };
    }

    const vehicle = await this.vehicleModel.findByPk(vehicleId);

    if (!vehicle) {
      throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    }

    // Update the vehicle's owner
    await vehicle.update({
      ownerId: newOwnerId,
    });

    // Update ownership history
    await this.ownershipHistoryModel.create({
      vehicleId,
      ownerId: transfer.currentOwnerId,
      ownershipStartDate: vehicle.createdAt,
      ownershipEndDate: new Date(),
    });

    await this.ownershipHistoryModel.create({
      vehicleId,
      ownerId: newOwnerId,
      ownershipStartDate: new Date(),
    });

    await transfer.update({
      status: 'Approved',
      approvedDate: new Date(),
    });

    return { message: 'Transfer approved and ownership updated' };
  }
}
