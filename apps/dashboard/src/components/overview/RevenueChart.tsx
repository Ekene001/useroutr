"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import type { Period } from "@/hooks/useAnalytics";

// ── Skeleton ──────────────────────────────────────────────────────────────────

export function RevenueChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-7 w-10 rounded-lg" />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-56 w-full rounded-xl" />
      </CardContent>
    </Card>
  );
}

// ── Chart config ─────────────────────────────────────────────────────────────

const chartConfig = {
  amount: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

// ── Helpers ──────────────────────────────────────────────────────────────────

const PERIODS: Period[] = ["7d", "30d", "90d", "1y"];

function formatXLabel(dateStr: string, period: Period): string {
  const d = new Date(dateStr);
  if (period === "1y") return d.toLocaleDateString("en-US", { month: "short" });
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatYTick(v: number): string {
  return v >= 1000 ? `$${(v / 1000).toFixed(0)}k` : `$${v}`;
}

// ── RevenueChart ─────────────────────────────────────────────────────────────

interface RevenueChartProps {
  data: { date: string; amount: number }[];
  period: Period;
  onPeriodChange: (p: Period) => void;
}

export function RevenueChart({
  data,
  period,
  onPeriodChange,
}: RevenueChartProps) {
  const tickInterval =
    period === "1y" ? 29 : period === "90d" ? 8 : period === "30d" ? 4 : 0;

  const chartData = data.map((d) => ({
    label: formatXLabel(d.date, period),
    amount: d.amount,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Revenue Over Time
            </CardTitle>
            <ToggleGroup
              type="single"
              value={period}
              onValueChange={(v) => {
                if (v) onPeriodChange(v as Period);
              }}
              variant="outline"
              size="sm"
            >
              {PERIODS.map((p) => (
                <ToggleGroupItem
                  key={p}
                  value={p}
                  className="text-xs px-3 h-7 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {p}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-56 w-full">
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-amount)"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-amount)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={tickInterval}
              />
              <YAxis
                tickFormatter={formatYTick}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => `$${Number(value).toLocaleString()}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="var(--color-amount)"
                strokeWidth={2.5}
                fill="url(#revGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "var(--color-amount)", strokeWidth: 0 }}
                animationDuration={400}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
