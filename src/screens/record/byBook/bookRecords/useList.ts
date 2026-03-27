import { useCallback, useMemo } from "react";

import type { RecordListItemModel } from "@/entities/record/model/types";
import type { BookInfo } from "@/entities/book/model/types";

import { useBookDetail } from "@/entities/book/data/queries";
import { useRecordList } from "@/entities/record/data/queries";
import type { TabId } from "../../main/Record";
import { useCurrentAnimal } from "@/entities/animal/data/queries";

export const PAGE_SIZE = 8;

type Result = {
  book: BookInfo | null;
  items: RecordListItemModel[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
};

export function useList(
  scope: TabId | null,
  bookId: string
): Result {
  const currentAnimal = useCurrentAnimal();
  const animalId = (scope === "currentAnimal") ? currentAnimal.data?.id : null;

  /* -------------------------------------- */
  /* 1) book query */
  /* -------------------------------------- */
  const bookQuery = useBookDetail(bookId);

  const book = bookQuery.data ?? null;

  /* -------------------------------------- */
  /* 2) records infinite query */
  /* -------------------------------------- */
  const recordsQuery = useRecordList({
    animalId,
    bookId,
    limit: PAGE_SIZE,
    enabled: !!book,
  });

  const items = useMemo(() => {
    const pages = recordsQuery.data?.pages ?? [];
    const all = pages.flatMap((p) => p.items);

    // id 기준 dedupe
    const map = new Map<string, RecordListItemModel>();
    for (const it of all) map.set(it.id, it);
    return Array.from(map.values());
  }, [recordsQuery.data?.pages]);

  const hasMore = recordsQuery.hasNextPage ?? false;

  const isLoading =
    bookQuery.isFetching ||
    recordsQuery.isFetching;

  const loadMore = useCallback(async () => {
    if (!recordsQuery.hasNextPage || recordsQuery.isFetchingNextPage) return;
    await recordsQuery.fetchNextPage();
  }, [recordsQuery]);

  const refresh = useCallback(async () => {
    await recordsQuery.refetch();
  }, [recordsQuery]);

  return {
    book,
    items,
    isLoading,
    hasMore,
    loadMore,
    refresh,
  };
}