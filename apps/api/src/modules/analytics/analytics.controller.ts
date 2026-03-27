import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentMerchant } from '../../common/decorators/current-merchant.decorator';
import { AnalyticsService } from './analytics.service';

@UseGuards(JwtAuthGuard)
@Controller('v1/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  async getOverview(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getOverview(merchantId, period || '30d');
  }

  @Get('revenue')
  async getRevenue(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
    @Query('granularity') granularity?: string,
  ) {
    return this.analyticsService.getRevenue(
      merchantId,
      period || '30d',
      granularity || 'day',
    );
  }

  @Get('payments')
  async getPaymentAnalytics(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getPaymentAnalytics(
      merchantId,
      period || '30d',
    );
  }

  @Get('failures')
  async getFailureAnalytics(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getFailureAnalytics(
      merchantId,
      period || '30d',
    );
  }

  @Get('currencies')
  async getCurrencyBreakdown(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getCurrencyBreakdown(
      merchantId,
      period || '30d',
    );
  }

  @Get('payouts')
  async getPayoutAnalytics(
    @CurrentMerchant('id') merchantId: string,
    @Query('period') period?: string,
  ) {
    return this.analyticsService.getPayoutAnalytics(
      merchantId,
      period || '30d',
    );
  }
}
