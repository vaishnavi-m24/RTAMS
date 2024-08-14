import { Test, TestingModule } from '@nestjs/testing';
import { RtoDivisionsService } from './rto-divisions.service';

describe('RtoDivisionsService', () => {
  let service: RtoDivisionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RtoDivisionsService],
    }).compile();

    service = module.get<RtoDivisionsService>(RtoDivisionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
