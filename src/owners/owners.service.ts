import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Owner } from './entities/owner.entity';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner)
    private readonly ownerModel: typeof Owner
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    return this.ownerModel.create(createOwnerDto);
  }

  async findAll(): Promise<Owner[]> {
    return this.ownerModel.findAll();
  }

  async findOne(id: string): Promise<Owner> {
    return this.ownerModel.findByPk(id);
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<[number, Owner[]]> {
    return this.ownerModel.update(updateOwnerDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: string): Promise<number> {
    return this.ownerModel.destroy({ where: { id } });
  }
}
