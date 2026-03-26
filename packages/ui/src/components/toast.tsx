"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Warning,
  Info,
} from "@phosphor-icons/react";
import { cn } from "../utils";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const MAX_VISIBLE = 3;

const VARIANT_CONFIG: Record<
  ToastVariant,
  { bg: string; icon: typeof CheckCircle }
> = {
  success: { bg: "border-[var(--green)]/30 bg-[var(--green)]/10", icon: CheckCircle },
  error: { bg: "border-[var(--red)]/30 bg-[var(--red)]/10", icon: XCircle },
  warning: { bg: "border-[var(--amber)]/30 bg-[var(--amber)]/10", icon: Warning },
  info: { bg: "border-[var(--blue)]/30 bg-[var(--blue)]/10", icon: Info },
};

const VARIANT_ICON_COLOR: Record<ToastVariant, string> = {
  success: "text-[var(--green)]",
  error: "text-[var(--red)]",
  warning: "text-[var(--amber)]",
  info: "text-[var(--blue)]",
};

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message: string, variant: ToastVariant = "info") => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev.slice(-(MAX_VISIBLE - 1)), { id, message, variant }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex max-w-[320px] flex-col gap-2">
        {toasts.map((t) => {
          const cfg = VARIANT_CONFIG[t.variant];
          const Icon = cfg.icon;
          return (
            <div
              key={t.id}
              className={cn(
                "flex items-start gap-3 rounded-[var(--radius-md)] border px-4 py-3 shadow-[var(--shadow-md)]",
                cfg.bg
              )}
              style={{ animation: "toast-slide-in 200ms ease-out" }}
            >
              <Icon
                size={18}
                weight="fill"
                className={cn("mt-0.5 shrink-0", VARIANT_ICON_COLOR[t.variant])}
              />
              <p className="flex-1 text-sm text-[var(--foreground)]">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export { ToastProvider, useToast };
