import { Test, TestingModule } from '@nestjs/testing';
import { InfluxController } from './influx.controller';

describe('InfluxController', () => {
  let controller: InfluxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfluxController],
    }).compile();

    controller = module.get<InfluxController>(InfluxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
