"use client";

import { forwardRef } from "react";
import { cn } from "../utils";

interface CurrencyOption {
  code: string;
  symbol: string;
  flag?: string;
}

interface CurrencyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  error?: string;
  currency?: string;
  currencies?: CurrencyOption[];
  onCurrencyChange?: (currency: string) => void;
  onAmountChange?: (amount: string) => void;
  convertedValue?: string;
  convertedCurrency?: string;
}

const DEFAULT_CURRENCIES: CurrencyOption[] = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "NGN", symbol: "₦", flag: "🇳🇬" },
  { code: "USDC", symbol: "$" },
  { code: "XLM", symbol: "★" },
];

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      label,
      error,
      currency = "USD",
      currencies = DEFAULT_CURRENCIES,
      onCurrencyChange,
      onAmountChange,
      convertedValue,
      convertedCurrency,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const selectedCurrency = currencies.find((c) => c.code === currency);

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex h-10 items-center overflow-hidden rounded-[var(--radius-sm)] border transition-colors focus-within:border-[var(--ring)] focus-within:ring-1 focus-within:ring-[var(--ring)]",
            error ? "border-[var(--destructive)]" : "border-[var(--input)]"
          )}
        >
          {/* Currency selector */}
          <select
            value={currency}
            onChange={(e) => onCurrencyChange?.(e.target.value)}
            className="h-full border-r border-[var(--border)] bg-[var(--secondary)] px-2 text-xs font-medium text-[var(--foreground)] outline-none"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag ? `${c.flag} ${c.code}` : c.code}
              </option>
            ))}
          </select>

          {/* Amount */}
          <div className="flex flex-1 items-center px-3">
            <span className="text-sm text-[var(--muted-foreground)]">
              {selectedCurrency?.symbol}
            </span>
            <input
              ref={ref}
              id={id}
              type="text"
              inputMode="decimal"
              value={value}
              onChange={(e) => onAmountChange?.(e.target.value)}
              className={cn(
                "h-full w-full bg-transparent pl-1 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)]",
                className
              )}
              {...props}
            />
          </div>
        </div>

        {/* Conversion display */}
        {convertedValue && convertedCurrency && (
          <p className="text-xs text-[var(--muted-foreground)]">
            ≈ {convertedValue} {convertedCurrency}
          </p>
        )}

        {error && <p className="text-xs text-[var(--destructive)]">{error}</p>}
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput, type CurrencyOption };
