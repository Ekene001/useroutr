"use client";

import { Timer } from "@phosphor-icons/react";

export function QuoteCountdown() {
  // TODO: Implement 30s countdown with quote polling
  return (
    <div className="flex items-center justify-between rounded-lg border border-amber/30 bg-amber/5 px-4 py-2.5">
      <div className="flex items-center gap-2">
        <Timer size={18} className="text-amber" />
        <span className="text-sm font-medium text-foreground">
          Quote expires in
        </span>
      </div>
      <span className="font-mono text-sm font-semibold text-amber">0:30</span>
    </div>
  );
}
