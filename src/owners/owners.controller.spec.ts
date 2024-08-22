import { Test, TestingModule } from '@nestjs/testing';
import { OwnerController } from './owners.controller';
import { OwnerService } from './owners.service';

describe('OwnersController', () => {
  let controller: OwnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerController],
      providers: [OwnerService],
    }).compile();

    controller = module.get<OwnerController>(OwnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
