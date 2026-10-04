import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { AgenciesController } from './agencies.controller';
import { AgenciesService } from './agencies.service';

describe('AgenciesController', () => {
  let controller: AgenciesController;
  const agenciesService = { generateReport: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgenciesController],
      providers: [
        { provide: AgenciesService, useValue: agenciesService },
        { provide: CACHE_MANAGER, useValue: {} },
      ],
    }).compile();

    controller = module.get<AgenciesController>(AgenciesController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getReport returns what the service generates', async () => {
    agenciesService.generateReport.mockResolvedValue({ total: 5 });

    await expect(controller.getReport()).resolves.toEqual({ total: 5 });
    expect(agenciesService.generateReport).toHaveBeenCalledTimes(1);
  });

  it('getList returns the hardcoded list', async () => {
    await expect(controller.getList()).resolves.toHaveLength(2);
  });
});
