"use client";

import { useState } from "react";
import { Modal, Button, Input } from "@tavvio/ui";
import { CurrencyInput } from "@tavvio/ui";
import { DatePicker } from "@tavvio/ui";
import type { CreatePaymentLinkInput } from "@tavvio/types";

interface CreateLinkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CreatePaymentLinkInput) => void;
  isLoading?: boolean;
}

export function CreateLinkModal({
  open,
  onOpenChange,
  onCreate,
  isLoading,
}: CreateLinkModalProps) {
  const [amountType, setAmountType] = useState<"fixed" | "open">("fixed");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [isSingleUse, setIsSingleUse] = useState(false);
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = () => {
    const data: CreatePaymentLinkInput = {
      description: description || undefined,
      single_use: isSingleUse,
    };

    if (amountType === "fixed" && amount) {
      data.amount = amount;
      data.currency = currency;
    }

    if (hasExpiry && expiryDate) {
      data.expires_at = new Date(expiryDate).toISOString();
    }

    onCreate(data);
  };

  const canSubmit = !hasExpiry || expiryDate !== "";

  const handleReset = () => {
    setAmountType("fixed");
    setAmount(undefined);
    setCurrency("USD");
    setDescription("");
    setIsSingleUse(false);
    setHasExpiry(false);
    setExpiryDate("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleReset();
    }
    onOpenChange(newOpen);
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleOpenChange}
      title="New Payment Link"
      description="Configure your payment link settings"
      footer={
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!canSubmit || isLoading}
          >
            Create Link
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Amount Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--foreground)]">Amount</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="amountType"
                checked={amountType === "fixed"}
                onChange={() => setAmountType("fixed")}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              <span className="text-sm text-[var(--foreground)]">Fixed amount</span>
            </label>
            {amountType === "fixed" && (
              <div className="pl-6">
                <CurrencyInput
                  value={amount?.toString() || ""}
                  currency={currency}
                  onCurrencyChange={setCurrency}
                  onAmountChange={(val) => setAmount(val ? parseFloat(val) : undefined)}
                  placeholder="0.00"
                />
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="amountType"
                checked={amountType === "open"}
                onChange={() => setAmountType("open")}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              <span className="text-sm text-[var(--foreground)]">
                Open amount (payer decides)
              </span>
            </label>
          </div>
        </div>

        {/* Description */}
        <Input
          label="Description (optional)"
          placeholder="e.g., Design consultation - 1hr"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Options */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-[var(--foreground)]">Options</label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSingleUse}
              onChange={(e) => setIsSingleUse(e.target.checked)}
              className="h-4 w-4 rounded accent-[var(--primary)]"
            />
            <span className="text-sm text-[var(--foreground)]">
              Single-use (one payment only)
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={hasExpiry}
              onChange={(e) => setHasExpiry(e.target.checked)}
              className="h-4 w-4 rounded accent-[var(--primary)]"
            />
            <span className="text-sm text-[var(--foreground)]">Set expiry date</span>
          </label>

          {hasExpiry && (
            <div className="pl-6">
              <DatePicker
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
