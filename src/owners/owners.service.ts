import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

  async create(createOwnerDto: CreateOwnerDto): Promise<{ message: string }> {
    try {
      await this.ownerModel.create(createOwnerDto);
      return { message: 'Owner created successfully' };
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException('Owner with this contact number or Aadhar number already exists', HttpStatus.BAD_REQUEST);
      }
      console.error('Error creating owner:', error);
      throw new HttpException('Failed to create owner', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Owner[]> {
    try {
      return await this.ownerModel.findAll();
    } catch (error) {
      throw new HttpException('Failed to retrieve owners', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Owner> {
    try {
      const owner = await this.ownerModel.findByPk(id);
      if (!owner) {
        throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
      }
      return owner;
    } catch (error) {
      throw new HttpException('Failed to retrieve owner', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto): Promise<{ message: string }> {
    try {
      const [affectedRows] = await this.ownerModel.update(updateOwnerDto, {
        where: { id },
        returning: true,
      });
      if (affectedRows === 0) {
        throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Owner updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update owner', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedRows = await this.ownerModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('Owner not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Owner deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete owner', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
