import { Button } from "@tavvio/ui";

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Webhooks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Configure webhook endpoints for real-time events
          </p>
        </div>
        <Button>Add endpoint</Button>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="divide-y divide-border">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="h-6 skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
