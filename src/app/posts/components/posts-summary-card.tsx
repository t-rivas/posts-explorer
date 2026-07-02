type PostsSummaryCardProps = {
  currentFilter: string;
  resultsCount: number;
  status: "idle" | "updating" | "slow";
  hasUpdateError: boolean;
  onDismissUpdateError: () => void;
};

export default function PostsSummaryCard({
  currentFilter,
  resultsCount,
  status,
  hasUpdateError,
  onDismissUpdateError,
}: PostsSummaryCardProps) {
  const filterText = currentFilter ? `User ${currentFilter}` : "All users";
  const resultsText = resultsCount === 1 ? "1 post" : `${resultsCount} posts`;
  const statusText =
    status === "slow" ? "Connection is taking longer..." : "Updating results...";
  const statusClassName =
    status === "slow"
      ? "flex items-center gap-2 font-medium text-blue-700 dark:text-blue-300"
      : "flex items-center gap-2 font-medium text-zinc-700 dark:text-zinc-200";
  const statusDotClassName =
    status === "slow" ? "size-2 rounded-full bg-blue-500" : "size-2 rounded-full bg-zinc-500";

  return (
    <div className="mt-4 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-zinc-500 dark:text-zinc-400">
            Filter
          </span>
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
            {filterText}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {resultsText}
          </span>
        </div>

        {status !== "idle" && (
          <span
            role="status"
            className={statusClassName}
          >
            <span className={statusDotClassName} />
            {statusText}
          </span>
        )}
      </div>

      {hasUpdateError && (
        <div
          role="alert"
          className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
        >
          <span>Couldn&apos;t update posts. Showing previous results.</span>
          <button
            type="button"
            aria-label="Close update error"
            onClick={onDismissUpdateError}
            className="text-lg leading-none text-amber-700 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
