import { useCallback, useEffect, useMemo, useState } from "react";
import type { RecordListItemModel } from "@/entities/record/model/types";
import { db } from "@/shared/infra/db/appDb";
import type { TabId } from "../main/Record";
import { useRecordList } from "@/entities/record/data/queries";

type Result = {
  items: RecordListItemModel[];
  isLoading: boolean;
  hasMore: boolean;
  totalCount?: number;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
};

const PAGE_SIZE = 8;

export function useList(scope: TabId = "allJourney"): Result {
  const [animalId, setAnimalId] = useState<string | null>(null);
  const [resolved, setResolved] = useState(scope !== "currentAnimal");

  // scope → animalId resolve (기존 로직 유지)
  useEffect(() => {
    let cancelled = false;

    async function resolveAnimal() {
      if (scope === "currentAnimal") {
        setResolved(false);
        const cur = await db.current_animal.get("current");
        if (!cancelled) {
          // currentAnimal인데 없으면 null -> "전체"랑 충돌 가능
          // records는 "all"이랑 섞여도 큰 문제 없긴 한데, 안전하게 "none" 추천
          setAnimalId(cur?.animalId ?? "none");
          setResolved(true);
        }
      } else {
        setAnimalId(null);
        setResolved(true);
      }
    }

    resolveAnimal();
    return () => {
      cancelled = true;
    };
  }, [scope]);

  const query = useRecordList({
    animalId,
    // bookId는 이 화면에서는 없음(전체 or currentAnimal)
    limit: PAGE_SIZE,
    enabled: resolved,
  });

  const items = useMemo(() => {
    const pages = query.data?.pages ?? [];
    const all = pages.flatMap((p) => p.items);

    // id 기준 dedupe (기존 안전장치 유지)
    const map = new Map<string, RecordListItemModel>();
    for (const it of all) map.set(it.id, it);
    return Array.from(map.values());
  }, [query.data?.pages]);

  const hasMore = query.hasNextPage ?? false;
  const isLoading = query.isFetching;

  const loadMore = useCallback(async () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;
    await query.fetchNextPage();
  }, [query]);

  const refresh = useCallback(async () => {
    await query.refetch();
  }, [query]);

  return {
    items,
    isLoading,
    hasMore,
    loadMore,
    refresh,
  };
}