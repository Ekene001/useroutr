export default function PaymentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  void params;

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Payment Details
      </h2>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Transaction info</h3>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 skeleton" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
            <div className="mt-4 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 skeleton" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
