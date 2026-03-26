"use client";

import { Lock } from "@phosphor-icons/react";

export function CardForm() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-base font-semibold text-foreground">
        Card details
      </h2>

      <form className="mt-4 space-y-4">
        {/* Card number */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Card number
          </label>
          <div className="h-10 w-full skeleton rounded-md" />
        </div>

        {/* Expiry + CVC row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              Expiry
            </label>
            <div className="h-10 w-full skeleton rounded-md" />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              CVC
            </label>
            <div className="h-10 w-full skeleton rounded-md" />
          </div>
        </div>

        {/* Name on card */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Name on card
          </label>
          <div className="h-10 w-full skeleton rounded-md" />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110"
        >
          <Lock size={16} weight="fill" />
          Pay now
        </button>
      </form>
    </div>
  );
}
