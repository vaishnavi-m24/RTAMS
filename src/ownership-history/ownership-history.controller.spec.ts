import { Test, TestingModule } from '@nestjs/testing';
import { OwnershipHistoryController } from './ownership-history.controller';
import { OwnershipHistoryService } from './ownership-history.service';

describe('OwnershipHistoryController', () => {
  let controller: OwnershipHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnershipHistoryController],
      providers: [OwnershipHistoryService],
    }).compile();

    controller = module.get<OwnershipHistoryController>(OwnershipHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
