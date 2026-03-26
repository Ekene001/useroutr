import { MerchantBranding } from "@/components/MerchantBranding";
import { TrustBadges } from "@/components/TrustBadges";

export default function PaymentLinkPage({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  void params;

  return (
    <div className="flex min-h-screen justify-center bg-muted/30 px-4 py-8 sm:px-8">
      <div className="w-full max-w-[460px] space-y-6">
        <MerchantBranding />

        {/* Payment link info */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <div className="h-5 w-40 skeleton" />
              <div className="mt-1 h-4 w-24 skeleton" />
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="skeleton h-6 w-24" />
              </div>
            </div>

            {/* Email input placeholder */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Your email
              </label>
              <div className="h-10 w-full skeleton rounded-md" />
            </div>

            <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:brightness-110">
              Continue to payment
            </button>
          </div>
        </div>

        <TrustBadges />
      </div>
    </div>
  );
}
