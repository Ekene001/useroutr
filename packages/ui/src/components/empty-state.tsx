import type { Icon } from "@phosphor-icons/react";
import { cn } from "../utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: Icon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function EmptyState({ icon: IconComponent, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)} {...props}>
      {IconComponent && (
        <div className="mb-4 rounded-full bg-[var(--muted)] p-4">
          <IconComponent size={48} weight="thin" className="text-[var(--muted-foreground)]" />
        </div>
      )}
      <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--foreground)]">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-[var(--muted-foreground)]">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export { EmptyState };
