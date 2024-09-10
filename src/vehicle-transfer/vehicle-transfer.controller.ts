// import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
// import { VehicleTransferService } from './vehicle-transfer.service';
// import { CreateVehicleTransferDto } from './dto/create-vehicle-transfer.dto';
// import { UpdateVehicleTransferDto } from './dto/update-vehicle-transfer.dto';

// @Controller('vehicle-transfer')
// export class VehicleTransferController {
//   constructor(private readonly vehicleTransferService: VehicleTransferService) {}

//   @Post()
//   create(@Body() createVehicleTransferDto: CreateVehicleTransferDto) {
//     return this.vehicleTransferService.create(createVehicleTransferDto);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.vehicleTransferService.findOne(id);
//   }

//   @Get()
//   findAll() {
//     return this.vehicleTransferService.findAll();
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateVehicleTransferDto: UpdateVehicleTransferDto) {
//     return this.vehicleTransferService.update(id, updateVehicleTransferDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.vehicleTransferService.remove(id);
//   }
// }


import { Controller, Post, Patch, Body, Param, Req, UseGuards,Get } from '@nestjs/common';
import { VehicleTransferService } from './vehicle-transfer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateVehicleTransferDto, RespondToVehicleTransferDto, ProcessVehicleTransferDto } from './dto/create-vehicle-transfer.dto';

@Controller('vehicle-transfers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VehicleTransferController {
  constructor(private readonly vehicleTransferService: VehicleTransferService) {}

  @Post('request-transfer')
  async requestTransfer(
    @Body() createVehicleTransferDto: CreateVehicleTransferDto,
    @Req() req
  ) {
    const user = req.user;
    return this.vehicleTransferService.requestTransfer(createVehicleTransferDto.vehicleId, user.id, createVehicleTransferDto.newOwnerMobile);
  }

  @Get('requests')
async getTransferRequests(@Req() req) {
  const userId = req.user.id;
  return this.vehicleTransferService.getTransferRequestsForUser(userId);
}


  @Patch('respond/:vehicleId')
  async respondToTransfer(
    @Param('vehicleId') vehicleId: number,
    @Body() respondToVehicleTransferDto: RespondToVehicleTransferDto,
    @Req() req
  ) {
    const user = req.user;
    return this.vehicleTransferService.respondToTransfer(vehicleId, user.id, respondToVehicleTransferDto.status);
  }

  @Patch('process/:vehicleId')
  @Roles('admin')
  async processTransferByAdmin(
    @Param('vehicleId') vehicleId: number,
    @Body() processVehicleTransferDto: ProcessVehicleTransferDto
  ) {
    return this.vehicleTransferService.processTransferByAdmin(vehicleId, processVehicleTransferDto.newOwnerId, processVehicleTransferDto.status);
  }
}
