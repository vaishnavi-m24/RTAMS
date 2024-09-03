// import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
// import { VehicleService } from './vehicles.service';
// import { CreateVehicleDto } from './dto/create-vehicle.dto';
// import { UpdateVehicleDto } from './dto/update-vehicle.dto';
// import {Request} from 'express';


// @Controller('vehicles')
// export class VehicleController {
//   constructor(private readonly vehicleService: VehicleService) {}

//   @Post()
//   async create(@Body() createVehicleDto: CreateVehicleDto) {
//     try {
//       return await this.vehicleService.create(createVehicleDto);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException('Failed to create vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Get()
//   async findAll(@Req() req: Request) {
//     try {
//       const user = req.user;
//       console.log(user);
//       return await this.vehicleService.findAll(user);
//     } catch (error) {
//       console.log(error);
//       throw new HttpException('Failed to retrieve vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
  
 
 
//   @Get(':id')
//   async findOne(@Param('id') id: string, @Req() req:Request) {
//     try {
//       const user = req.user;
//       const vehicle = await this.vehicleService.findOne(id,user);
//       if (!vehicle) {
//         throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
//       }
//       return vehicle;
//     } catch (error) {
//       console.log(error);
//       throw new HttpException('Failed to retrieve vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
//     try {
//       return await this.vehicleService.update(id, updateVehicleDto);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException('Failed to update vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     try {
//       return await this.vehicleService.remove(id);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException('Failed to delete vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }
// }

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('vehicles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  async create(@Body() createVehicleDto: CreateVehicleDto, @Req() req: Request) {
    try {
      const user = req.user;
      if (user.role !== 'admin') {
        createVehicleDto.ownerId = user.id; // Set the ownerId to the current user's ID
      }
      return await this.vehicleService.create(createVehicleDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to create vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Req() req: Request) {
    try {
      const user = req.user;
      return await this.vehicleService.findAll(user);
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to retrieve vehicles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    try {
      const user = req.user;
      const vehicle = await this.vehicleService.findOne(id, user);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      return vehicle;
    } catch (error) {
      console.log(error);
      throw new HttpException('Failed to retrieve vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto, @Req() req: Request) {
    try {
      const user = req.user;
      const vehicle = await this.vehicleService.findOne(id, user);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }
      return await this.vehicleService.update(id, updateVehicleDto);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to update vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    try {
      const user = req.user;
      const vehicle = await this.vehicleService.findOne(id, user);
      if (!vehicle) {
        throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
      }
      if (user.role !== 'admin' && vehicle.ownerId !== user.id) {
        throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
      }
      return await this.vehicleService.remove(id);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to delete vehicle', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
