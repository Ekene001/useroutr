import { Clock } from "@phosphor-icons/react/dist/ssr";
import { TrustBadges } from "@/components/TrustBadges";
import { MerchantBranding } from "@/components/MerchantBranding";

export default function ExpiredPage({
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber/10">
            <Clock size={40} weight="fill" className="text-amber" />
          </div>
          <h2 className="mt-4 font-display text-lg font-semibold text-foreground">
            Session expired
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your payment session or quote has expired. Please request a new
            payment link from the merchant.
          </p>

          <button className="mt-6 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
            Try again
          </button>
        </div>

        <TrustBadges />
      </div>
    </div>
  );
}
