import { Test, TestingModule } from '@nestjs/testing';
import { OwnershipHistoryService } from './ownership-history.service';

describe('OwnershipHistoryService', () => {
  let service: OwnershipHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnershipHistoryService],
    }).compile();

    service = module.get<OwnershipHistoryService>(OwnershipHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
