import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards,HttpException,HttpStatus } from '@nestjs/common';
import { OwnershipHistoryService } from './ownership-history.service';
import { CreateOwnershipHistoryDto } from './dto/create-ownership-history.dto';
import { UpdateOwnershipHistoryDto } from './dto/update-ownership-history.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('ownership-history')
export class OwnershipHistoryController {
  constructor(private readonly ownershipHistoryService: OwnershipHistoryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Post()
  create(@Body() createOwnershipHistoryDto: CreateOwnershipHistoryDto, @Req() req) {
    if (req.user.role === 'user') {
      createOwnershipHistoryDto.ownerId = req.user.id;
    }
    return this.ownershipHistoryService.create(createOwnershipHistoryDto);
  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')  // Only accessible by admin
  @Get('dashboard-stats')
  async getUserStats(@Req() req: Request) {
    try {
      return await this.ownershipHistoryService.getHistoryStats();
    } catch (error) {
      throw new HttpException('Failed to retrieve ownership-history stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req.user;
    return this.ownershipHistoryService.findOne(id, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Get()
  findAll(@Req() req) {
    const user = req.user;
    return this.ownershipHistoryService.findAll(user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'user')
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOwnershipHistoryDto: UpdateOwnershipHistoryDto, @Req() req) {
    const user = req.user;
    return this.ownershipHistoryService.update(id, updateOwnershipHistoryDto, user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownershipHistoryService.remove(id);
  }
}
