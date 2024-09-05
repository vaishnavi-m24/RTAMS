// @Injectable()
// export class OwnershipHistoryService {
//   constructor(
//     @InjectModel(OwnershipHistory)
//     private readonly ownershipHistoryModel: typeof OwnershipHistory
//   ) {}

//   async create(createOwnershipHistoryDto: CreateOwnershipHistoryDto): Promise<{ message: string }> {
//     try {
//       //Convert date strings to Date objects
//       const ownershipStartDate = moment(createOwnershipHistoryDto.ownershipStartDate, 'DD/MM/YYYY').toDate();
//       const ownershipEndDate = createOwnershipHistoryDto.ownershipEndDate
//         ? moment(createOwnershipHistoryDto.ownershipEndDate, 'DD/MM/YYYY').toDate()
//         : null;

//       const ownershipHistory = {
//         ...createOwnershipHistoryDto,
//         ownershipStartDate,
//         ownershipEndDate,
//       };

//       await this.ownershipHistoryModel.create(ownershipHistory);

//       return { message: 'Ownership history created successfully' };
//     } catch (error) {
//       console.log(error);
//       throw new HttpException('Failed to create ownership history', HttpStatus.BAD_REQUEST);
//     }
//   }

//   async findAll(user: User): Promise<OwnershipHistory[]> {
//     try {
//       if(user.role === 'admin'){
//         return await this.ownershipHistoryModel.findAll();
//       }
//       else{
//         return await this.ownershipHistoryModel.findAll({
//           where:{ownerId :user.id},
//         });
//       }
//     } catch (error) {
//       throw new HttpException('Failed to retrieve ownership histories', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async findOne(id: string,user:User): Promise<OwnershipHistory> {
//     try {
//       const ownershipHistory = await this.ownershipHistoryModel.findByPk(id);
//       if (!ownershipHistory) {
//         throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
//       }
//       if(user.role !== 'admin' && this.ownershipHistoryModel.findByPk(id)){
//         throw new HttpException('Access denied',HttpStatus.FORBIDDEN);
//       }
//       return ownershipHistory;
//     } catch (error) {
//       throw new HttpException('Failed to retrieve ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async update(id: string, updateOwnershipHistoryDto: UpdateOwnershipHistoryDto): Promise<{ message: string }> {
//     try {
//       // Convert date strings to Date objects
//       const ownershipStartDate = moment(updateOwnershipHistoryDto.ownershipStartDate, 'DD/MM/YYYY').toDate();
//       const ownershipEndDate = updateOwnershipHistoryDto.ownershipEndDate
//         ? moment(updateOwnershipHistoryDto.ownershipEndDate, 'DD/MM/YYYY').toDate()
//         : null;

//       const updateData = {
//         ...updateOwnershipHistoryDto,
//         ownershipStartDate,
//         ownershipEndDate,
//       };

//       const [affectedRows] = await this.ownershipHistoryModel.update(updateData, {
//         where: { id },
//         returning: true,
//       });
//       if (affectedRows === 0) {
//         throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
//       }
//       return { message: 'Ownership history updated successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to update ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async remove(id: string): Promise<{ message: string }> {
//     try {
//       const deletedRows = await this.ownershipHistoryModel.destroy({ where: { id } });
//       if (deletedRows === 0) {
//         throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
//       }
//       return { message: 'Ownership history deleted successfully' };
//     } catch (error) {
//       throw new HttpException('Failed to delete ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }


import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OwnershipHistory } from './entities/ownership-history.entity';
import { CreateOwnershipHistoryDto } from './dto/create-ownership-history.dto';
import { UpdateOwnershipHistoryDto } from './dto/update-ownership-history.dto';
import {User } from  '../users/entities/user.entity'
import * as moment from 'moment';

@Injectable()
export class OwnershipHistoryService {
  constructor(
    @InjectModel(OwnershipHistory)
    private readonly ownershipHistoryModel: typeof OwnershipHistory
  ) {}

  async create(createOwnershipHistoryDto: CreateOwnershipHistoryDto): Promise<{ message: string }> {
    try {
      const ownershipStartDate = moment(createOwnershipHistoryDto.ownershipStartDate, 'DD/MM/YYYY').toDate();
      const ownershipEndDate = createOwnershipHistoryDto.ownershipEndDate
        ? moment(createOwnershipHistoryDto.ownershipEndDate, 'DD/MM/YYYY').toDate()
        : null;

      const ownershipHistory = {
        ...createOwnershipHistoryDto,
        ownershipStartDate,
        ownershipEndDate,
      };

      await this.ownershipHistoryModel.create(ownershipHistory);

      return { message: 'Ownership history created successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to create ownership history', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(user: User): Promise<OwnershipHistory[]> {
    try {
      if (user.role === 'admin') {
        return await this.ownershipHistoryModel.findAll();
      } else {
        return await this.ownershipHistoryModel.findAll({
          where: { ownerId: user.id },
        });
      }
    } catch (error) {
      throw new HttpException('Failed to retrieve ownership histories', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string, user: User): Promise<OwnershipHistory> {
    try {
      const ownershipHistory = await this.ownershipHistoryModel.findByPk(id);
      if (!ownershipHistory) {
        throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
      }
      if (user.role !== 'admin' && ownershipHistory.ownerId !== user.id) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }
      return ownershipHistory;
    } catch (error) {
      throw new HttpException('Failed to retrieve ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateOwnershipHistoryDto: UpdateOwnershipHistoryDto, user: User): Promise<{ message: string }> {
    try {
      const ownershipHistory = await this.findOne(id, user);
      if (user.role !== 'admin' && ownershipHistory.ownerId !== user.id) {
        throw new HttpException('You can update only your own ownership history', HttpStatus.FORBIDDEN);
      }

      const ownershipStartDate = moment(updateOwnershipHistoryDto.ownershipStartDate, 'DD/MM/YYYY').toDate();
      const ownershipEndDate = updateOwnershipHistoryDto.ownershipEndDate
        ? moment(updateOwnershipHistoryDto.ownershipEndDate, 'DD/MM/YYYY').toDate()
        : null;

      const updateData = {
        ...updateOwnershipHistoryDto,
        ownershipStartDate,
        ownershipEndDate,
      };

      const [affectedRows] = await this.ownershipHistoryModel.update(updateData, {
        where: { id },
        returning: true,
      });

      if (affectedRows === 0) {
        throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Ownership history updated successfully' };
    } catch (error) {
      throw new HttpException('Failed to update ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const deletedRows = await this.ownershipHistoryModel.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new HttpException('Ownership history not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Ownership history deleted successfully' };
    } catch (error) {
      throw new HttpException('Failed to delete ownership history', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getHistoryStats() {
    const totalHistory = await this.ownershipHistoryModel.count();
    console.log(totalHistory);
    return {
      totalHistory,
    };
  }
}
