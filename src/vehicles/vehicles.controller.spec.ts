import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicles.controller';
import { VehicleService } from './vehicles.service';

describe('VehiclesController', () => {
  let controller: VehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [VehicleService],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
