import { cn } from "@tavvio/ui";

interface OrderSummaryProps {
  compact?: boolean;
}

export function OrderSummary({ compact }: OrderSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        compact ? "p-4" : "p-6"
      )}
    >
      {!compact && (
        <h2 className="font-display text-base font-semibold text-foreground">
          Order summary
        </h2>
      )}

      <div className={cn("space-y-3", !compact && "mt-4")}>
        {/* Line items placeholder */}
        <div className="flex justify-between">
          <span className="skeleton h-4 w-32" />
          <span className="skeleton h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <span className="skeleton h-4 w-24" />
          <span className="skeleton h-4 w-14" />
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Total */}
        <div className="flex justify-between">
          <span className="text-sm font-medium text-foreground">Total</span>
          <span className="font-mono text-lg font-semibold text-foreground">
            <span className="skeleton inline-block h-6 w-24" />
          </span>
        </div>
      </div>
    </div>
  );
}
