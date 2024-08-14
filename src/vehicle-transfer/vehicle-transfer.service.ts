import { Injectable } from '@nestjs/common';
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

  async create(createVehicleTransferDto: CreateVehicleTransferDto): Promise<VehicleTransfer> {
    return this.vehicleTransferModel.create(createVehicleTransferDto);
  }

  async findAll(): Promise<VehicleTransfer[]> {
    return this.vehicleTransferModel.findAll();
  }

  async findOne(id: string): Promise<VehicleTransfer> {
    return this.vehicleTransferModel.findByPk(id);
  }

  async update(id: string, updateVehicleTransferDto: UpdateVehicleTransferDto): Promise<[number, VehicleTransfer[]]> {
    return this.vehicleTransferModel.update(updateVehicleTransferDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: string): Promise<number> {
    return this.vehicleTransferModel.destroy({ where: { id } });
  }
}
