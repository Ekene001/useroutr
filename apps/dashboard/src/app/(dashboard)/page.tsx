"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useDashboardSocket } from "@/hooks/useDashboardSocket";
import { useQueryClient } from "@tanstack/react-query";

import { GreetingHeader } from "@/components/overview/GreetingHeader";
import {
  MetricCard,
  MetricCardSkeleton,
} from "@/components/overview/MetricCard";
import {
  BalanceWidget,
  BalanceWidgetSkeleton,
} from "@/components/overview/BalanceWidget";
import {
  RevenueChart,
  RevenueChartSkeleton,
} from "@/components/overview/RevenueChart";
import { QuickActions } from "@/components/overview/QuickActions";
import {
  RecentTransactions,
  RecentTransactionsSkeleton,
  type RecentTransaction,
} from "@/components/overview/RecentTransactions";

export default function OverviewPage() {
  const { merchant } = useAuth();
  const { data, isLoading, period, setPeriod } = useAnalytics();
  const queryClient = useQueryClient();

  // Live transaction prepend list + highlight set for flash animation
  const [liveTransactions, setLiveTransactions] = useState<RecentTransaction[]>(
    [],
  );
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());

  // Optimistically inject completed payments via WebSocket
  const { subscribe } = useDashboardSocket();

  const handlePaymentCompleted = useCallback(
    (tx: RecentTransaction) => {
      // Prepend new tx and cap at 5
      setLiveTransactions((prev) => [tx, ...prev].slice(0, 5));

      // Flash-highlight for 1.5 s
      setHighlightIds((ids) => new Set([...ids, tx.id]));
      setTimeout(() => {
        setHighlightIds((ids) => {
          const next = new Set(ids);
          next.delete(tx.id);
          return next;
        });
      }, 1500);

      // Invalidate the analytics cache so next background refetch picks up totals
      queryClient.invalidateQueries({ queryKey: ["analytics-overview"] });
    },
    [queryClient],
  );

  // Subscribe to the merchant-scoped payment:completed event
  useState(() => {
    const unsub = subscribe("payment:status", (payload: unknown) => {
      const p = payload as { status: string; transaction: RecentTransaction };
      if (p?.status === "COMPLETED" && p?.transaction) {
        handlePaymentCompleted(p.transaction);
      }
    });
    return unsub;
  });

  // Merge live prepend rows with API data (live rows always on top)
  const apiTransactions = data?.recentTransactions ?? [];
  const mergedTransactions =
    liveTransactions.length > 0
      ? [...liveTransactions, ...apiTransactions].slice(0, 5)
      : apiTransactions;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <GreetingHeader
        merchantName={merchant?.companyName ?? merchant?.name ?? "Merchant"}
      />

      {/* Metric cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              label="Revenue"
              value={data?.revenue.total ?? 0}
              delta={data?.revenue.delta}
              sparkline={data?.revenue.sparkline}
              prefix="$"
              index={0}
            />
            <MetricCard
              label="Payments"
              value={data?.payments.total ?? 0}
              delta={data?.payments.delta}
              sparkline={data?.payments.sparkline}
              prefix=""
              plain
              index={1}
            />
            <MetricCard
              label="Payouts"
              value={data?.payouts.total ?? 0}
              delta={data?.payouts.delta}
              prefix="$"
              index={2}
            />
            <BalanceWidget
              amount={data?.balance.amount ?? 0}
              asset={data?.balance.asset ?? "USDC"}
              index={3}
            />
          </>
        )}
      </section>

      {/* Revenue chart + Quick actions */}
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        {isLoading ? (
          <RevenueChartSkeleton />
        ) : (
          <RevenueChart
            data={data?.revenueChart ?? []}
            period={period}
            onPeriodChange={setPeriod}
          />
        )}
        <QuickActions />
      </section>

      {/* Recent transactions */}
      <section>
        {isLoading ? (
          <RecentTransactionsSkeleton />
        ) : (
          <RecentTransactions
            transactions={mergedTransactions}
            highlightIds={highlightIds}
          />
        )}
      </section>
    </div>
  );
}
