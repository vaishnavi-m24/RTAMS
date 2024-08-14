import { Test, TestingModule } from '@nestjs/testing';
import { RtoDivisionsController } from './rto-divisions.controller';
import { RtoDivisionsService } from './rto-divisions.service';

describe('RtoDivisionsController', () => {
  let controller: RtoDivisionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RtoDivisionsController],
      providers: [RtoDivisionsService],
    }).compile();

    controller = module.get<RtoDivisionsController>(RtoDivisionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
