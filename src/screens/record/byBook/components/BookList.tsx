import { useEffect, useRef } from "react";

type Props<T> = {
  items: T[];
  isLoading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;

  emptyText?: string;

  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;

  className?: string;
};

export default function BookList<T>({
  items,
  isLoading = false,
  hasMore = true,
  loadMore,
  emptyText = "비어있어요",
  getKey,
  renderItem,
  className,
}: Props<T>) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const isEmpty = items.length === 0;

  useEffect(() => {
    if (!hasMore || !loadMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting) loadMore();
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  return (
    <div className={["h-full min-h-0 overflow-y-auto px-5", className].filter(Boolean).join(" ")}>
      {isEmpty ? (
        <div className="py-10 text-center text-black/50">{emptyText}</div>
      ) : (
        <div className="flex flex-col gap-1 pb-6">
          {items.map((it) => (
            <div key={getKey(it)}>{renderItem(it)}</div>
          ))}
        </div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-10" />}

      {isLoading && (
        <div className="py-3 text-center text-black/40 text-sm">불러오는 중…</div>
      )}
    </div>
  );
}
