import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { RtoDivisionService } from './rto-divisions.service';
import { CreateRTODivisionDto } from './dto/create-rto-division.dto';
import { UpdateRTODivisionDto } from './dto/update-rto-division.dto';

@Controller('rto-divisions')
export class RtoDivisionController {
  constructor(private readonly rtoDivisionService: RtoDivisionService) {}

  @Post()
  create(@Body() createRtoDivisionDto: CreateRTODivisionDto) {
    return this.rtoDivisionService.create(createRtoDivisionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rtoDivisionService.findOne(id);
  }

  @Get()
  findAll() {
    return this.rtoDivisionService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRtoDivisionDto: UpdateRTODivisionDto) {
    return this.rtoDivisionService.update(id, updateRtoDivisionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rtoDivisionService.remove(id);
  }
}
