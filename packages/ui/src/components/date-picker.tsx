"use client";

import { forwardRef } from "react";
import { Calendar } from "@phosphor-icons/react";
import { cn } from "../utils";

interface DatePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="date"
          className={cn(
            "h-10 w-full rounded-[var(--radius-sm)] border bg-transparent px-3 pr-10 text-sm text-[var(--foreground)] outline-none transition-colors",
            "focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-[var(--destructive)]" : "border-[var(--input)]",
            className
          )}
          {...props}
        />
        <Calendar
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
        />
      </div>
      {error && <p className="text-xs text-[var(--destructive)]">{error}</p>}
    </div>
  )
);
DatePicker.displayName = "DatePicker";

/* ── Date Range ── */

interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onStartChange?: (date: string) => void;
  onEndChange?: (date: string) => void;
  label?: string;
  error?: string;
}

function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  label,
  error,
}: DateRangePickerProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange?.(e.target.value)}
          className="h-10 flex-1 rounded-[var(--radius-sm)] border border-[var(--input)] bg-transparent px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
        />
        <span className="text-sm text-[var(--muted-foreground)]">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange?.(e.target.value)}
          className="h-10 flex-1 rounded-[var(--radius-sm)] border border-[var(--input)] bg-transparent px-3 text-sm text-[var(--foreground)] outline-none focus:border-[var(--ring)] focus:ring-1 focus:ring-[var(--ring)]"
        />
      </div>
      {error && <p className="text-xs text-[var(--destructive)]">{error}</p>}
    </div>
  );
}

export { DatePicker, DateRangePicker };
