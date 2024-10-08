
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async create(createRtoDivisionDto: CreateRTODivisionDto): Promise<{ message: string }> {
    try {
      await this.rtoDivisionModel.create(createRtoDivisionDto);
      return { message: 'RTO division created successfully' };
    } catch (error) {
      throw new HttpException('Failed to create RTO division', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<RtoDivision[]> {
    try {
      return await this.rtoDivisionModel.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve RTO divisions', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // async findOne(id: string): Promise<RtoDivision> {
  //   try {
  //     const rtoDivision = await this.rtoDivisionModel.findByPk(id);
  //     if (!rtoDivision) {
  //       throw new HttpException('RTO division not found', HttpStatus.NOT_FOUND);
  //     }
  //     return rtoDivision;
  //   } catch (error) {
  //     throw new HttpException('Failed to retrieve RTO division', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async update(id: string, updateRtoDivisionDto: UpdateRTODivisionDto): Promise<{ message: string }> {
    try {
      const [affectedRows] = await this.rtoDivisionModel.update(updateRtoDivisionDto, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        throw new HttpException('RTO division not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'RTO division updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update RTO division', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedRows = await this.rtoDivisionModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('RTO division not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'RTO division deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete RTO division', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAllDivisionNames(): Promise<string[]> {
    try {
      const divisions = await this.rtoDivisionModel.findAll();
      return divisions.map((division) => division.divisionName);
    } catch (error) {
      throw new Error('Failed to retrieve RTO division');
    }
  }
}
