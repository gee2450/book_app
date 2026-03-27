import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useScrollStore } from "@/shared/model/useScrollStore";

type Props<T> = {
  items: T[];
  isLoading?: boolean;
  hasMore?: boolean;
  loadMore?: () => void;

  emptyText?: string;

  getKey: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onItemClick?: (item: T) => void;

  className?: string;
  scrollKey?: string;
};

export default function RecordList<T>({
  items,
  isLoading = false,
  hasMore = true,
  loadMore,
  emptyText = "기록이 없어요",
  getKey,
  renderItem,
  onItemClick,
  className,
  scrollKey,
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const restoredRef = useRef(false);

  const setPosition = useScrollStore((s) => s.setPosition);
  const getPosition = useScrollStore((s) => s.getPosition);
  const markForRestore = useScrollStore((s) => s.markForRestore);
  const consumeRestoreFlag = useScrollStore((s) => s.consumeRestoreFlag);

  const isEmpty = items.length === 0;

  const saveScroll = useCallback(() => {
    if (!scrollKey || !containerRef.current) return;
    setPosition(scrollKey, containerRef.current.scrollTop);
  }, [scrollKey, setPosition]);

  useEffect(() => {
    if (!hasMore || !loadMore) return;

    const target = sentinelRef.current;
    const root = containerRef.current;
    if (!target || !root) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void loadMore();
        }
      },
      {
        root,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    if (!scrollKey) return;

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", saveScroll, { passive: true });

    return () => {
      saveScroll();
      el.removeEventListener("scroll", saveScroll);
    };
  }, [scrollKey, saveScroll]);

  useLayoutEffect(() => {
    if (!scrollKey) return;
    if (restoredRef.current) return;
    if (items.length === 0) return;

    const shouldRestore = consumeRestoreFlag(scrollKey);
    if (!shouldRestore) {
      restoredRef.current = true;
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const targetTop = getPosition(scrollKey);
    let tries = 0;
    const maxTries = 12;

    const restore = () => {
      const node = containerRef.current;
      if (!node) return;

      node.scrollTop = targetTop;
      tries += 1;

      const applied = Math.abs(node.scrollTop - targetTop) < 2;
      const enoughHeight = node.scrollHeight - node.clientHeight >= targetTop;

      if (applied || enoughHeight || tries >= maxTries) {
        restoredRef.current = true;
        return;
      }

      requestAnimationFrame(restore);
    };

    requestAnimationFrame(restore);
  }, [items.length, scrollKey, getPosition, consumeRestoreFlag]);

  return (
    <div
      ref={containerRef}
      className={["h-full min-h-0 overflow-y-auto px-5", className]
        .filter(Boolean)
        .join(" ")}
    >
      {isEmpty ? (
        <div className="py-10 text-center text-black/50">{emptyText}</div>
      ) : (
        <div className="flex flex-col gap-2 pb-6">
          {items.map((it) => (
            <div
              key={getKey(it)}
              onClick={() => {
                saveScroll();

                if (scrollKey) {
                  markForRestore(scrollKey);
                }

                onItemClick?.(it);
              }}
            >
              {renderItem(it)}
            </div>
          ))}
        </div>
      )}

      {hasMore && <div ref={sentinelRef} className="h-10" />}

      {isLoading && (
        <div className="py-3 text-center text-sm text-black/40">
          불러오는 중…
        </div>
      )}
    </div>
  );
}