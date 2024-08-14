import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnershipHistory } from './entities/ownership-history.entity';
import { CreateOwnershipHistoryDto } from './dto/create-ownership-history.dto';
import { UpdateOwnershipHistoryDto } from './dto/update-ownership-history.dto';

@Injectable()
export class OwnershipHistoryService {
  constructor(
    @InjectModel(OwnershipHistory)
    private readonly ownershipHistoryModel: typeof OwnershipHistory
  ) {}

  async create(createOwnershipHistoryDto: CreateOwnershipHistoryDto): Promise<OwnershipHistory> {
    return this.ownershipHistoryModel.create(createOwnershipHistoryDto);
  }

  async findAll(): Promise<OwnershipHistory[]> {
    return this.ownershipHistoryModel.findAll();
  }

  async findOne(id: string): Promise<OwnershipHistory> {
    return this.ownershipHistoryModel.findByPk(id);
  }

  async update(id: string, updateOwnershipHistoryDto: UpdateOwnershipHistoryDto): Promise<[number, OwnershipHistory[]]> {
    return this.ownershipHistoryModel.update(updateOwnershipHistoryDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: string): Promise<number> {
    return this.ownershipHistoryModel.destroy({ where: { id } });
  }
}
