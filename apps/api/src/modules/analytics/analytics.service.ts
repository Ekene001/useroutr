import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';

export interface OverviewData {
  revenue: { total: number; delta: number };
  payments: { count: number; delta: number };
  payouts: { total: number };
  balance: number;
  sparklines: { date: string; value: number }[];
  recentTxns: any[];
}

export interface TimeSeriesData {
  data: { date: string; value: number }[];
}

export interface PaymentAnalytics {
  total: number;
  delta: number;
  conversionRate: number;
  byMethod: { method: string; amount: number; percentage: number }[];
}

export interface FailureAnalytics {
  failureRate: number;
  byHourHeatmap: { hour: number; count: number }[];
  topReasons: { reason: string; count: number }[];
}

export interface CurrencyData {
  currency: string;
  amount: number;
  percentage: number;
}

export interface PayoutAnalytics {
  totalVolume: number;
  delta: number;
  byStatus: { status: string; count: number }[];
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

  private getPeriodDates(period: string) {
    const currentEnd = new Date();
    let days = 30;
    if (period === '7d') days = 7;
    else if (period === '30d') days = 30;
    else if (period === '90d') days = 90;
    else if (period === '1y') days = 365;

    const currentStart = new Date(
      currentEnd.getTime() - days * 24 * 60 * 60 * 1000,
    );
    const previousEnd = currentStart;
    const previousStart = new Date(
      previousEnd.getTime() - days * 24 * 60 * 60 * 1000,
    );

    return { currentStart, currentEnd, previousStart, previousEnd };
  }

  private calculateDelta(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Number((((current - previous) / previous) * 100).toFixed(2));
  }

  private async getCached<T>(
    key: string,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    const cached = await this.redis.get(key);
    if (cached) return JSON.parse(cached) as T;
    const data = await fetcher();
    await this.redis.setex(key, 120, JSON.stringify(data));
    return data;
  }

  async getOverview(merchantId: string, period: string): Promise<OverviewData> {
    return this.getCached(
      `analytics:${merchantId}:overview:${period}`,
      async () => {
        const { currentStart, currentEnd, previousStart, previousEnd } =
          this.getPeriodDates(period);

        // Revenue computations
        const currRevenueAggr = await this.prisma.payment.aggregate({
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _sum: { destAmount: true },
        });
        const prevRevenueAggr = await this.prisma.payment.aggregate({
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: previousStart, lte: previousEnd },
          },
          _sum: { destAmount: true },
        });

        const currRevenue = Number(currRevenueAggr._sum.destAmount || 0);
        const prevRevenue = Number(prevRevenueAggr._sum.destAmount || 0);
        const revenueDelta = this.calculateDelta(currRevenue, prevRevenue);

        // Payments computations
        const currPaymentsCount = await this.prisma.payment.count({
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
        });
        const prevPaymentsCount = await this.prisma.payment.count({
          where: {
            merchantId,
            createdAt: { gte: previousStart, lte: previousEnd },
          },
        });
        const paymentDelta = this.calculateDelta(
          currPaymentsCount,
          prevPaymentsCount,
        );

        // Payouts computations
        const currPayoutsAggr = await this.prisma.payout.aggregate({
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _sum: { amount: true },
        });
        const currPayouts = Number(currPayoutsAggr._sum.amount || 0);

        // Sparklines (simplified daily sum)
        const dailyRevenue = await this.prisma.$queryRaw<
          { date: string; value: number }[]
        >`
        SELECT DATE_TRUNC('day', "createdAt") as date, SUM("destAmount") as value
        FROM "Payment"
        WHERE "merchantId" = ${merchantId} AND status = 'COMPLETED' AND "createdAt" >= ${currentStart} AND "createdAt" <= ${currentEnd}
        GROUP BY DATE_TRUNC('day', "createdAt")
        ORDER BY date ASC;
      `;

        // Recent txns
        const recentTxns = await this.prisma.payment.findMany({
          where: { merchantId },
          orderBy: { createdAt: 'desc' },
          take: 5,
        });

        return {
          revenue: { total: currRevenue, delta: revenueDelta },
          payments: { count: currPaymentsCount, delta: paymentDelta },
          payouts: { total: currPayouts },
          balance: currRevenue - currPayouts,
          sparklines: dailyRevenue.map((r) => ({
            date: String(r.date),
            value: Number(r.value),
          })),
          recentTxns,
        };
      },
    );
  }

  async getRevenue(
    merchantId: string,
    period: string,
    granularity: string,
  ): Promise<TimeSeriesData> {
    return this.getCached(
      `analytics:${merchantId}:revenue:${period}:${granularity}`,
      async () => {
        const { currentStart, currentEnd } = this.getPeriodDates(period);
        // granularity: 'day' | 'week' | 'month'
        const timeSeries = await this.prisma.$queryRaw<
          { date: string; value: number }[]
        >`
        SELECT DATE_TRUNC(${granularity}, "createdAt") as date, SUM("destAmount") as value
        FROM "Payment"
        WHERE "merchantId" = ${merchantId} AND status = 'COMPLETED' AND "createdAt" >= ${currentStart} AND "createdAt" <= ${currentEnd}
        GROUP BY DATE_TRUNC(${granularity}, "createdAt")
        ORDER BY date ASC;
      `;
        return {
          data: timeSeries.map((r) => ({
            date: String(r.date),
            value: Number(r.value),
          })),
        };
      },
    );
  }

  async getPaymentAnalytics(
    merchantId: string,
    period: string,
  ): Promise<PaymentAnalytics> {
    return this.getCached(
      `analytics:${merchantId}:payments:${period}`,
      async () => {
        const { currentStart, currentEnd, previousStart, previousEnd } =
          this.getPeriodDates(period);

        const currTotal = await this.prisma.payment.count({
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
        });
        const prevTotal = await this.prisma.payment.count({
          where: {
            merchantId,
            createdAt: { gte: previousStart, lte: previousEnd },
          },
        });
        const delta = this.calculateDelta(currTotal, prevTotal);

        const currCompleted = await this.prisma.payment.count({
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
        });
        const conversionRate =
          currTotal > 0
            ? Number(((currCompleted / currTotal) * 100).toFixed(2))
            : 0;

        const methodsCount = await this.prisma.payment.groupBy({
          by: ['sourceChain'],
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _count: { sourceChain: true },
        });

        const byMethod = methodsCount.map((m) => ({
          method: m.sourceChain || 'unknown',
          amount: m._count.sourceChain,
          percentage:
            currTotal > 0
              ? Number(((m._count.sourceChain / currTotal) * 100).toFixed(2))
              : 0,
        }));

        return { total: currTotal, delta, conversionRate, byMethod };
      },
    );
  }

  async getFailureAnalytics(
    merchantId: string,
    period: string,
  ): Promise<FailureAnalytics> {
    return this.getCached(
      `analytics:${merchantId}:failures:${period}`,
      async () => {
        const { currentStart, currentEnd } = this.getPeriodDates(period);

        const total = await this.prisma.payment.count({
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
        });
        const failed = await this.prisma.payment.count({
          where: {
            merchantId,
            status: 'FAILED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
        });
        const failureRate =
          total > 0 ? Number(((failed / total) * 100).toFixed(2)) : 0;

        // Extract hour from createdAt directly through Postgres raw query
        const heatmap = await this.prisma.$queryRaw<
          { hour: number; count: number | bigint }[]
        >`
        SELECT EXTRACT(HOUR FROM "createdAt") as hour, COUNT(*) as count
        FROM "Payment"
        WHERE "merchantId" = ${merchantId} AND status = 'FAILED' AND "createdAt" >= ${currentStart} AND "createdAt" <= ${currentEnd}
        GROUP BY EXTRACT(HOUR FROM "createdAt")
        ORDER BY hour ASC;
      `;

        return {
          failureRate,
          byHourHeatmap: heatmap.map((h) => ({
            hour: Number(h.hour),
            count: Number(h.count),
          })),
          topReasons: [{ reason: 'Generic Failure', count: failed }], // Mocking top reason as schema lacks failure reason on Payment
        };
      },
    );
  }

  async getCurrencyBreakdown(
    merchantId: string,
    period: string,
  ): Promise<CurrencyData[]> {
    return this.getCached(
      `analytics:${merchantId}:currencies:${period}`,
      async () => {
        const { currentStart, currentEnd } = this.getPeriodDates(period);

        const totalAggr = await this.prisma.payment.aggregate({
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _sum: { destAmount: true },
        });
        const totalVolume = Number(totalAggr._sum.destAmount || 0);

        const breakdown = await this.prisma.payment.groupBy({
          by: ['destAsset'],
          where: {
            merchantId,
            status: 'COMPLETED',
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _sum: { destAmount: true },
          orderBy: { _sum: { destAmount: 'desc' } },
        });

        return breakdown.map((b) => {
          const amount = Number(b._sum.destAmount || 0);
          return {
            currency: b.destAsset,
            amount,
            percentage:
              totalVolume > 0
                ? Number(((amount / totalVolume) * 100).toFixed(2))
                : 0,
          };
        });
      },
    );
  }

  async getPayoutAnalytics(
    merchantId: string,
    period: string,
  ): Promise<PayoutAnalytics> {
    return this.getCached(
      `analytics:${merchantId}:payouts:${period}`,
      async () => {
        const { currentStart, currentEnd, previousStart, previousEnd } =
          this.getPeriodDates(period);

        const currAggr = await this.prisma.payout.aggregate({
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _sum: { amount: true },
        });
        const prevAggr = await this.prisma.payout.aggregate({
          where: {
            merchantId,
            createdAt: { gte: previousStart, lte: previousEnd },
          },
          _sum: { amount: true },
        });

        const currTotal = Number(currAggr._sum.amount || 0);
        const prevTotal = Number(prevAggr._sum.amount || 0);
        const delta = this.calculateDelta(currTotal, prevTotal);

        const statusGroup = await this.prisma.payout.groupBy({
          by: ['status'],
          where: {
            merchantId,
            createdAt: { gte: currentStart, lte: currentEnd },
          },
          _count: { status: true },
        });

        return {
          totalVolume: currTotal,
          delta,
          byStatus: statusGroup.map((s) => ({
            status: s.status,
            count: s._count.status,
          })),
        };
      },
    );
  }
}
