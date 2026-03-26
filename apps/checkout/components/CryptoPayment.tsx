"use client";

import { Wallet } from "@phosphor-icons/react";

export function CryptoPayment() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-base font-semibold text-foreground">
        Pay with crypto
      </h2>

      <div className="mt-4 space-y-4">
        {/* Network / token selection placeholder */}
        <div>
          <p className="text-sm font-medium text-foreground">Select token</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {["USDC", "ETH", "BTC"].map((token) => (
              <button
                key={token}
                className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Amount display */}
        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-xs text-muted-foreground">You pay</p>
          <span className="skeleton mt-1 inline-block h-8 w-32" />
        </div>

        {/* Connect wallet */}
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110">
          <Wallet size={18} />
          Connect wallet
        </button>
      </div>
    </div>
  );
}
