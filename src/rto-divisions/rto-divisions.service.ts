import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RtoDivision } from './entities/rto-division.entity';
import { CreateRTODivisionDto } from './dto/create-rto-division.dto';
import { UpdateRTODivisionDto } from './dto/update-rto-division.dto';

@Injectable()
export class RtoDivisionService {
  constructor(
    @InjectModel(RtoDivision)
    private readonly rtoDivisionModel: typeof RtoDivision
  ) {}

  async create(createRtoDivisionDto: CreateRTODivisionDto): Promise<RtoDivision> {
    return this.rtoDivisionModel.create(createRtoDivisionDto);
  }

  async findAll(): Promise<RtoDivision[]> {
    return this.rtoDivisionModel.findAll();
  }

  async findOne(id: string): Promise<RtoDivision> {
    return this.rtoDivisionModel.findByPk(id);
  }

  async update(id: string, updateRtoDivisionDto: UpdateRTODivisionDto): Promise<[number, RtoDivision[]]> {
    return this.rtoDivisionModel.update(updateRtoDivisionDto, {
      where: { id },
      returning: true
    });
  }

  async remove(id: string): Promise<number> {
    return this.rtoDivisionModel.destroy({ where: { id } });
  }
}
