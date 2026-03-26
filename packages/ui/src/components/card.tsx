"use client";

import { forwardRef } from "react";
import { cn } from "../utils";

/* ── Base Card ── */

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] shadow-[var(--shadow-sm)]",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-[var(--font-display)] text-base font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-[var(--muted-foreground)]", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

/* ── Metric Card ── */

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value?: string | number;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
}

function MetricCard({ label, value, delta, trend, loading, className, ...props }: MetricCardProps) {
  return (
    <Card className={cn("p-5", className)} {...props}>
      <p className="text-sm text-[var(--muted-foreground)]">{label}</p>
      {loading ? (
        <div className="mt-2 h-8 w-24 skeleton" />
      ) : (
        <div className="mt-1 flex items-end gap-2">
          <span className="font-[var(--font-display)] text-2xl font-bold text-[var(--foreground)]">
            {value}
          </span>
          {delta && (
            <span
              className={cn(
                "mb-0.5 text-xs font-medium",
                trend === "up" && "text-[var(--green)]",
                trend === "down" && "text-[var(--red)]",
                trend === "neutral" && "text-[var(--muted-foreground)]"
              )}
            >
              {delta}
            </span>
          )}
        </div>
      )}
    </Card>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, MetricCard };
