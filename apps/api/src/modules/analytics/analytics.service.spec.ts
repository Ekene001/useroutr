import { Test, TestingModule } from '@nestjs/testing';

// Mock PrismaService to avoid loading the generated Prisma client
const mockPrismaService = {
  payment: {
    aggregate: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
    findMany: jest.fn(),
  },
  payout: {
    aggregate: jest.fn(),
    count: jest.fn(),
    groupBy: jest.fn(),
  },
  $queryRaw: jest.fn(),
};

jest.mock('../prisma/prisma.service', () => ({
  PrismaService: jest.fn().mockImplementation(() => mockPrismaService),
}));

import { AnalyticsService } from './analytics.service';
import { PrismaService } from '../prisma/prisma.service';

const mockRedis = {
  get: jest.fn(),
  setex: jest.fn(),
};

describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        { provide: PrismaService, useValue: mockPrismaService },
        {
          provide: 'default_IORedisModuleConnectionToken',
          useValue: mockRedis,
        },
      ],
    }).compile();

    service = module.get<AnalyticsService>(AnalyticsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOverview', () => {
    it('should return cached data if available', async () => {
      const cachedResult = { balance: 1000 };
      mockRedis.get.mockResolvedValueOnce(JSON.stringify(cachedResult));
      const result = await service.getOverview('merchant-1', '30d');
      expect(result).toEqual(cachedResult);
    });

    it('should compute and cache if not in redis', async () => {
      mockRedis.get.mockResolvedValueOnce(null);
      mockPrismaService.payment.aggregate.mockResolvedValue({
        _sum: { destAmount: 500 },
      });
      mockPrismaService.payment.count.mockResolvedValue(10);
      mockPrismaService.payout.aggregate.mockResolvedValue({
        _sum: { amount: 100 },
      });
      mockPrismaService.$queryRaw.mockResolvedValue([]);
      mockPrismaService.payment.findMany.mockResolvedValue([]);

      const result = await service.getOverview('merchant-1', '30d');
      expect(result.balance).toBe(400); // 500 - 100
      expect(mockRedis.setex).toHaveBeenCalled();
    });
  });
});
