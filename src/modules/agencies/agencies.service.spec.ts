import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AgenciesService } from './agencies.service';

type RegionReport = {
  regionCode: string;
  services: { name: string; count: number }[];
};

describe('AgenciesService', () => {
  let service: AgenciesService;
  const httpService = { get: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgenciesService,
        { provide: HttpService, useValue: httpService },
      ],
    }).compile();

    service = module.get<AgenciesService>(AgenciesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateReport', () => {
    it('counts services per region and service group', async () => {
      const agencies = [
        {
          locations: [{ country: { code: 'AU' } }],
          agencyService: [
            { service: { serviceGroup: { name: 'Media, PR & Events' } } },
            { service: { serviceGroup: { name: 'Something else' } } },
          ],
        },
        {
          locations: [{ country: { code: 'PH' } }],
          agencyService: [
            {
              service: {
                serviceGroup: { name: 'Advertising, Brand & Creative' },
              },
            },
          ],
        },
      ];
      // Only the first page (skip=0) returns data; every other page is empty.
      httpService.get.mockImplementation((url: string) =>
        of({ data: url.endsWith('skip=0') ? [agencies] : [[]] }),
      );

      const report = (await service.generateReport()) as RegionReport[];

      expect(httpService.get).toHaveBeenCalledTimes(13);
      expect(report.map((r) => r.regionCode)).toEqual([
        'AU',
        'GB',
        'US',
        'OTHERS',
      ]);

      const au = report.find((r) => r.regionCode === 'AU')?.services;
      expect(au).toEqual([
        { name: 'Advertising, Brand & Creative', count: 0 },
        { name: 'Media, PR & Events', count: 1 },
        { name: 'others', count: 1 },
      ]);

      const others = report.find((r) => r.regionCode === 'OTHERS')?.services;
      expect(others).toEqual([
        { name: 'Advertising, Brand & Creative', count: 1 },
        { name: 'Media, PR & Events', count: 0 },
        { name: 'others', count: 0 },
      ]);
    });

    it('treats a failed page as empty instead of throwing', async () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      httpService.get.mockReturnValue(throwError(() => new Error('timeout')));

      const report = (await service.generateReport()) as RegionReport[];

      for (const region of report) {
        for (const s of region.services) {
          expect(s.count).toBe(0);
        }
      }
      jest.restoreAllMocks();
    });
  });
});
