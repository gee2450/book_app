import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useScrollStore } from "@/shared/model/useScrollStore";

type RecordListProps<T> = {
  items: T[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;

  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T, index: number) => string;

  className?: string;
  containerClassName?: string;
  emptyText?: string;
  rootMargin?: string;
  isLoadingMore?: boolean;

  scrollKey?: string;
  onItemClick?: (item: T) => void;
};

export default function RecordList<T>({
  items,
  isLoading,
  hasMore,
  loadMore,
  renderItem,
  getKey,
  className,
  containerClassName,
  emptyText = "기록이 아직 없어요",
  rootMargin = "300px 0px",
  isLoadingMore,
  scrollKey,
  onItemClick,
}: RecordListProps<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const restoredRef = useRef(false);

  const setPosition = useScrollStore((s) => s.setPosition);
  const getPosition = useScrollStore((s) => s.getPosition);
  const markForRestore = useScrollStore((s) => s.markForRestore);
  const consumeRestoreFlag = useScrollStore((s) => s.consumeRestoreFlag);

  const showEmpty = !isLoading && items.length === 0;

  const loadingMore = useMemo(() => {
    return isLoadingMore ?? (isLoading && items.length > 0);
  }, [isLoadingMore, isLoading, items.length]);

  const saveScroll = useCallback(() => {
    if (!scrollKey) return;
    const el = containerRef.current;
    if (!el) return;

    setPosition(scrollKey, el.scrollTop);
  }, [scrollKey, setPosition]);

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

  useEffect(() => {
    if (!hasMore) return;

    const target = sentinelRef.current;
    const root = containerRef.current;
    if (!target || !root) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (loadingMore) return;
        loadMore();
      },
      { root, rootMargin, threshold: 0 }
    );

    io.observe(target);
    return () => io.disconnect();
  }, [hasMore, loadMore, loadingMore, rootMargin]);

  return (
    <div className="py-5 px-5 flex h-full min-h-0 w-full">
      <div
        ref={containerRef}
        className={["w-full pb-6 h-full overflow-y-auto", containerClassName ?? ""].join(" ")}
      >
        <div className={["w-full max-w-105 mx-auto flex flex-col gap-3", className ?? ""].join(" ")}>
          {isLoading && items.length === 0 ? (
            <div className="py-10 text-center text-black/50">불러오는 중…</div>
          ) : null}

          {showEmpty ? (
            <div className="py-10 text-center text-black/50">{emptyText}</div>
          ) : null}

          {items.map((it, idx) => (
            <div
              key={getKey(it, idx)}
              onClick={() => {
                saveScroll();

                if (scrollKey) {
                  markForRestore(scrollKey);
                }

                onItemClick?.(it);
              }}
            >
              {renderItem(it, idx)}
            </div>
          ))}

          {hasMore ? (
            <div ref={sentinelRef} className="py-6 text-center text-black/40">
              {loadingMore ? "더 불러오는 중…" : " "}
            </div>
          ) : items.length > 0 ? (
            <div className="py-6 text-center text-black/30">끝!</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}