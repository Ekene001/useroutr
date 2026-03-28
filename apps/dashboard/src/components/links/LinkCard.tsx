"use client";

import { cn } from "@/lib/utils";
import { Card, CardContent, Button } from "@tavvio/ui";
import { QrCode, Trash } from "@phosphor-icons/react";
import { formatCurrency } from "@/lib/utils";
import { LinkStatusBadge } from "./LinkStatusBadge";
import { CopyButton } from "./CopyButton";
import type { PaymentLink } from "@tavvio/types";

interface LinkCardProps {
  link: PaymentLink;
  onQRCode: (link: PaymentLink) => void;
  onDeactivate: (link: PaymentLink) => void;
}

export function LinkCard({ link, onQRCode, onDeactivate }: LinkCardProps) {
  const isExpired = link.status === "expired";
  const isDeactivated = link.status === "deactivated";
  const canDeactivate = !isExpired && !isDeactivated;

  const expiryLabel = link.expiresAt
    ? new Date(link.expiresAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  const isSingleUse = link.type === "single-use";

  return (
    <Card
      className={cn(
        "p-5 transition-all duration-200 hover:shadow-md",
        isExpired && "opacity-60",
        isDeactivated && "opacity-50"
      )}
    >
      <CardContent className="space-y-4 p-0">
        {/* Header: ID + Status */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-[var(--muted-foreground)]">{link.id}</p>
          </div>
          <LinkStatusBadge status={link.status} />
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-[var(--foreground)]">
            {link.amount
              ? formatCurrency(link.amount, link.currency)
              : "Open Amount"}
          </span>
          <span className="text-xs font-medium text-[var(--muted-foreground)]">
            {isSingleUse ? "Single-use" : "Multi-use"}
          </span>
        </div>

        {/* Description */}
        {link.description && (
          <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
            {link.description}
          </p>
        )}

        {/* Usage + Expiry */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted-foreground)]">
            Used: <span className="font-medium text-[var(--foreground)]">{link.usageCount}</span> times
          </span>
          {expiryLabel ? (
            <span className="text-[var(--muted-foreground)]">
              Expires: <span className="font-medium text-[var(--foreground)]">{expiryLabel}</span>
            </span>
          ) : (
            <span className="text-[var(--muted-foreground)]">No expiry</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <CopyButton
            value={link.url}
            feedbackText="Copied!"
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onQRCode(link)}
            className="flex-1"
          >
            <QrCode size={16} />
            QR Code
          </Button>
          {canDeactivate && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onDeactivate(link)}
              className="text-[var(--red)] hover:bg-[var(--red)]/10 hover:text-[var(--red)]"
            >
              <Trash size={16} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
