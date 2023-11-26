import clsx from "clsx";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
};

export function Skeleton({
  className,
  loading = false,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "bg-slate-500/10",
        loading ? "animate-pulse" : "",
        className
      )}
      {...props}
    />
  );
}
