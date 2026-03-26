export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Payments
        </h2>
        <div className="h-9 w-24 skeleton rounded-md" />
      </div>

      {/* Filters placeholder */}
      <div className="flex gap-3">
        {["Status", "Date range", "Amount"].map((filter) => (
          <div key={filter} className="h-9 w-28 skeleton rounded-md" />
        ))}
      </div>

      {/* Table placeholder */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-3">
          <div className="grid grid-cols-5 gap-4">
            {["ID", "Amount", "Status", "Customer", "Date"].map((h) => (
              <span key={h} className="text-xs font-medium text-muted-foreground">
                {h}
              </span>
            ))}
          </div>
        </div>
        <div className="divide-y divide-border">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="h-5 skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
