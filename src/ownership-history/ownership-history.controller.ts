// import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
// import { OwnershipHistoryService } from './ownership-history.service';
// import { CreateOwnershipHistoryDto } from './dto/create-ownership-history.dto';
// import { UpdateOwnershipHistoryDto } from './dto/update-ownership-history.dto';

// @Controller('ownership-history')
// export class OwnershipHistoryController {
//   constructor(private readonly ownershipHistoryService: OwnershipHistoryService) {}

//   @Post()
//   create(@Body() createOwnershipHistoryDto: CreateOwnershipHistoryDto) {
//     return this.ownershipHistoryService.create(createOwnershipHistoryDto);
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.ownershipHistoryService.findOne(id);
//   }

//   @Get()
//   findAll() {
//     return this.ownershipHistoryService.findAll();
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateOwnershipHistoryDto: UpdateOwnershipHistoryDto) {
//     return this.ownershipHistoryService.update(id, updateOwnershipHistoryDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.ownershipHistoryService.remove(id);
//   }
// }

import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OwnershipHistoryService } from './ownership-history.service';
import { CreateOwnershipHistoryDto } from './dto/create-ownership-history.dto';
import { UpdateOwnershipHistoryDto } from './dto/update-ownership-history.dto';

@Controller('ownership-history')
export class OwnershipHistoryController {
  constructor(private readonly ownershipHistoryService: OwnershipHistoryService) {}

  @Post()
  create(@Body() createOwnershipHistoryDto: CreateOwnershipHistoryDto) {
    return this.ownershipHistoryService.create(createOwnershipHistoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownershipHistoryService.findOne(id);
  }

  @Get()
  findAll() {
    return this.ownershipHistoryService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOwnershipHistoryDto: UpdateOwnershipHistoryDto) {
    return this.ownershipHistoryService.update(id, updateOwnershipHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownershipHistoryService.remove(id);
  }
}
