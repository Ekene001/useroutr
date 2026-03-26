import { Button } from "@tavvio/ui";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">
            Team
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage team members and their roles
          </p>
        </div>
        <Button>Invite member</Button>
      </div>

      <div className="rounded-lg border border-border bg-card shadow-sm">
        <div className="divide-y divide-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-6 py-4">
              <div className="h-10 skeleton" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
