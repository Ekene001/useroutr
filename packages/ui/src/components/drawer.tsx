"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "@phosphor-icons/react";
import { cn } from "../utils";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

function Drawer({
  open,
  onOpenChange,
  title,
  description,
  children,
  side = "right",
  className,
}: DrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed top-0 z-50 flex h-full w-full max-w-[520px] flex-col bg-[var(--popover)] shadow-[var(--shadow-lg)]",
            "transition-transform duration-[250ms] ease-out",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            side === "right"
              ? "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
              : "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            className
          )}
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <div>
                <Dialog.Title className="font-[var(--font-display)] text-base font-semibold text-[var(--foreground)]">
                  {title}
                </Dialog.Title>
                {description && (
                  <Dialog.Description className="mt-0.5 text-sm text-[var(--muted-foreground)]">
                    {description}
                  </Dialog.Description>
                )}
              </div>
              <Dialog.Close className="rounded-[var(--radius-sm)] p-1.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--secondary)] hover:text-[var(--foreground)]">
                <X size={18} />
              </Dialog.Close>
            </div>
          )}

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { Drawer };
