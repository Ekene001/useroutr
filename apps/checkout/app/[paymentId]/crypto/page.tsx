import { OrderSummary } from "@/components/OrderSummary";
import { CryptoPayment } from "@/components/CryptoPayment";
import { QuoteCountdown } from "@/components/QuoteCountdown";
import { TrustBadges } from "@/components/TrustBadges";
import { MerchantBranding } from "@/components/MerchantBranding";

export default function CryptoPaymentPage({
  params,
}: {
  params: Promise<{ paymentId: string }>;
}) {
  void params;

  return (
    <div className="flex min-h-screen justify-center bg-muted/30 px-4 py-8 sm:px-8">
      <div className="w-full max-w-[460px] space-y-6">
        <MerchantBranding />
        <OrderSummary compact />
        <QuoteCountdown />
        <CryptoPayment />
        <TrustBadges />
      </div>
    </div>
  );
}
