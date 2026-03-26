import { Button } from "@tavvio/ui";

export default function PaymentLinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Payment Links
        </h2>
        <Button>Create link</Button>
      </div>

      {/* Links grid placeholder */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            <div className="h-5 w-32 skeleton" />
            <div className="mt-2 h-4 w-20 skeleton" />
            <div className="mt-4 h-4 w-full skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}
