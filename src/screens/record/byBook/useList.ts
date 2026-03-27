import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { db } from "@/shared/infra/db/appDb";

import type { TabId } from "../main/Record";
import { bookKeys } from "@/entities/book/data/keys";
import { useBookList } from "@/entities/book/data/queries";
import type { BookDetailInfo } from "@/entities/book/model";

type Result = {
  items: BookDetailInfo[];
  totalCount?: number;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
};

const PAGE_SIZE = 8;

export function useList(scope: TabId = "allJourney"): Result {
  const qc = useQueryClient();

  const [animalId, setAnimalId] = useState<string | null>(null);
  const [resolved, setResolved] = useState(scope !== "currentAnimal");

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      if (scope !== "currentAnimal") {
        setAnimalId(null);
        setResolved(true);
        return;
      }

      setResolved(false);
      const cur = await db.current_animal.get("current");
      if (cancelled) return;

      setAnimalId(cur?.animalId ?? "none");
      setResolved(true);
    }

    resolve();
    return () => {
      cancelled = true;
    };
  }, [scope]);

  const query = useBookList({
    animalId,
    limit: PAGE_SIZE,
    enabled: resolved,
  });

  const items = useMemo(() => {
    const pages = query.data?.pages ?? [];
    const all = pages.flatMap((p) => p.items);

    // id 기준 dedupe
    const map = new Map<string, BookDetailInfo>();
    for (const b of all) map.set(b.id, b);
    return Array.from(map.values());
  }, [query.data?.pages]);

  const totalCount = query.data?.pages?.[0]?.total;
  const hasMore = query.hasNextPage ?? false;
  const isLoading = query.isFetching;

  const loadMore = useCallback(async () => {
    if (!query.hasNextPage || query.isFetchingNextPage) return;
    await query.fetchNextPage();
  }, [query]);

  const refresh = useCallback(async () => {
    const queryKey = bookKeys.list({ animalId });
    await qc.invalidateQueries({ queryKey });
  }, [qc, animalId]);

  return { items, totalCount, isLoading, hasMore, loadMore, refresh };
}