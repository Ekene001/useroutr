import { OrderSummary } from "@/components/OrderSummary";
import { CardForm } from "@/components/CardForm";
import { TrustBadges } from "@/components/TrustBadges";
import { MerchantBranding } from "@/components/MerchantBranding";

export default function CardPaymentPage({
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
        <CardForm />
        <TrustBadges />
      </div>
    </div>
  );
}
