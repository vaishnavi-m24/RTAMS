import { Test, TestingModule } from '@nestjs/testing';
import { VehicleTransferService } from './vehicle-transfer.service';

describe('VehicleTransferService', () => {
  let service: VehicleTransferService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleTransferService],
    }).compile();

    service = module.get<VehicleTransferService>(VehicleTransferService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
