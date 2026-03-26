import { StatusIndicator } from "@/components/StatusIndicator";
import { TrustBadges } from "@/components/TrustBadges";
import { MerchantBranding } from "@/components/MerchantBranding";

export default function ConfirmPage({
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
          <StatusIndicator status="processing" />
          <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
            Processing your payment
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please wait while we confirm your transaction. This usually takes a
            few seconds.
          </p>
        </div>

        <TrustBadges />
      </div>
    </div>
  );
}
