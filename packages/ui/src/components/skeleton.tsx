import { cn } from "../utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("skeleton", className)} {...props} />;
}

export { Skeleton };
