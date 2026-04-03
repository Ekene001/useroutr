"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/useCountUp";

export function BalanceWidgetSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <Skeleton className="mb-3 h-4 w-32" />
        <Skeleton className="mb-2 h-9 w-40" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </CardContent>
    </Card>
  );
}

interface BalanceWidgetProps {
  amount: number;
  asset: string;
  index?: number;
}

export function BalanceWidget({
  amount,
  asset,
  index = 3,
}: BalanceWidgetProps) {
  const animated = useCountUp(amount, 600);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.07 }}
    >
      <Card className="h-full overflow-hidden border-primary/20 bg-linear-to-br from-primary/5 to-transparent transition-shadow hover:shadow-md">
        <CardContent className="p-6">
          {/* Label row */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Wallet className="h-3.5 w-3.5 text-primary" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Settlement Balance
            </p>
          </div>

          {/* Amount */}
          <p className="text-3xl font-bold leading-none tracking-tight text-foreground">
            {animated.toLocaleString()}
          </p>

          {/* Asset badge */}
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
              {asset}
            </span>
            <span className="text-xs text-muted-foreground">via Stellar</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
