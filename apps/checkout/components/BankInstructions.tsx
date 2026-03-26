import { Copy } from "@phosphor-icons/react/dist/ssr";

export function BankInstructions() {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="font-display text-base font-semibold text-foreground">
        Bank transfer instructions
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Transfer the exact amount to the account below
      </p>

      <div className="mt-4 space-y-3 rounded-lg bg-muted/50 p-4">
        {[
          { label: "Bank", value: "" },
          { label: "Account name", value: "" },
          { label: "Account number", value: "" },
          { label: "Reference", value: "" },
          { label: "Amount", value: "" },
        ].map((field) => (
          <div key={field.label} className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{field.label}</p>
              <span className="skeleton mt-0.5 inline-block h-4 w-32" />
            </div>
            <button className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Payment will be confirmed automatically once the transfer is received.
      </p>
    </div>
  );
}
