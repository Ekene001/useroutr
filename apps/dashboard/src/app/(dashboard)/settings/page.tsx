export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-semibold text-foreground">
        Settings
      </h2>

      <div className="max-w-2xl space-y-6">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-medium text-foreground">Business information</h3>
          <p className="mt-1 text-sm text-muted-foreground">Update your business details</p>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 skeleton rounded-md" />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-medium text-foreground">Notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage your notification preferences</p>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-8 skeleton rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
