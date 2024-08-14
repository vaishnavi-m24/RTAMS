import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle)
    private readonly vehicleModel: typeof Vehicle
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleModel.create(createVehicleDto);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.findAll();
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findByPk(id);
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<[number, Vehicle[]]> {
    return this.vehicleModel.update(updateVehicleDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: string): Promise<number> {
    return this.vehicleModel.destroy({ where: { id } });
  }
}
