import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { TrustBadges } from "@/components/TrustBadges";
import { MerchantBranding } from "@/components/MerchantBranding";

export default function SuccessPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  void params;

  return (
    <div className="flex min-h-screen justify-center bg-muted/30 px-4 py-8 sm:px-8">
      <div className="w-full max-w-[460px] space-y-6">
        <MerchantBranding />

        <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
            <CheckCircle size={40} weight="fill" className="text-green" />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
            Payment successful
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment has been confirmed. You can close this window or return
            to the merchant.
          </p>

          {/* Transaction summary placeholder */}
          <div className="mt-6 space-y-2 rounded-lg bg-muted/50 p-4 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-mono font-medium text-foreground">
                <span className="skeleton inline-block h-4 w-20" />
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs text-foreground">
                <span className="skeleton inline-block h-4 w-28" />
              </span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110">
            Return to merchant
          </button>
        </div>

        <TrustBadges />
      </div>
    </div>
  );
}
