export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Overview
      </h2>

      {/* Metric cards placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Total Volume", "Transactions", "Active Links", "Pending Payouts"].map(
          (label) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className="mt-2 h-8 w-24 skeleton" />
            </div>
          )
        )}
      </div>

      {/* Chart placeholder */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">
          Revenue over time
        </h3>
        <div className="mt-4 h-[300px] skeleton" />
      </div>

      {/* Recent transactions placeholder */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">
          Recent transactions
        </h3>
        <div className="mt-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}
