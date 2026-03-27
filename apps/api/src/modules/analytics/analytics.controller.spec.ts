/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';

// Mock PrismaService to avoid loading the generated Prisma client
jest.mock('../prisma/prisma.service', () => ({
  PrismaService: jest.fn(),
}));

import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

describe('AnalyticsController', () => {
  let controller: AnalyticsController;
  let service: AnalyticsService;

  const mockAnalyticsService = {
    getOverview: jest
      .fn()
      .mockResolvedValue({ revenue: { total: 0, delta: 0 } }),
    getRevenue: jest.fn().mockResolvedValue({ data: [] }),
    getPaymentAnalytics: jest.fn().mockResolvedValue({ total: 0 }),
    getFailureAnalytics: jest.fn().mockResolvedValue({ failureRate: 0 }),
    getCurrencyBreakdown: jest.fn().mockResolvedValue([]),
    getPayoutAnalytics: jest.fn().mockResolvedValue({ totalVolume: 0 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalyticsController],
      providers: [
        {
          provide: AnalyticsService,
          useValue: mockAnalyticsService,
        },
      ],
    }).compile();

    controller = module.get<AnalyticsController>(AnalyticsController);
    service = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOverview', () => {
    it('should return overview data', async () => {
      const result = await controller.getOverview('merchant-1', '30d');
      expect(result).toEqual({ revenue: { total: 0, delta: 0 } });
      expect(service.getOverview).toHaveBeenCalledWith('merchant-1', '30d');
    });
  });

  describe('getRevenue', () => {
    it('should return revenue time series', async () => {
      const result = await controller.getRevenue('merchant-1', '30d', 'day');
      expect(result).toEqual({ data: [] });
      expect(service.getRevenue).toHaveBeenCalledWith(
        'merchant-1',
        '30d',
        'day',
      );
    });
  });
});
