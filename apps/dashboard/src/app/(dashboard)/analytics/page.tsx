export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Analytics
      </h2>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Revenue", "Transaction count", "Avg. transaction", "Conversion rate"].map(
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

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Revenue trend</h3>
          <div className="mt-4 h-[250px] skeleton" />
        </div>
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Payment methods</h3>
          <div className="mt-4 h-[250px] skeleton" />
        </div>
      </div>

      {/* Volume chart */}
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <h3 className="text-sm font-medium text-muted-foreground">Transaction volume</h3>
        <div className="mt-4 h-[300px] skeleton" />
      </div>
    </div>
  );
}
