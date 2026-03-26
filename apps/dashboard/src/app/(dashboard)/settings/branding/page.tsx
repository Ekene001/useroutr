export default function BrandingPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Branding
      </h2>
      <p className="text-sm text-muted-foreground">
        Customize the look of your payment pages and invoices
      </p>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-medium text-foreground">Logo</h3>
          <div className="mt-4 h-32 skeleton rounded-lg" />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-medium text-foreground">Brand colors</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {["Primary", "Secondary"].map((label) => (
              <div key={label}>
                <p className="mb-1 text-sm text-muted-foreground">{label}</p>
                <div className="h-10 skeleton rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
