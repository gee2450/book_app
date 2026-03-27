import { fetchRecordListPage, fetchTodayRecordCount } from "./fetchers";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { db } from "@/shared/infra/db/appDb";
import { recordKeys } from "./keys";
import type { RecordListItemModel } from "@/entities/record/model/types";
import type { AnimalInfo } from "@/entities/animal/model/types";
import type { BookInfo } from "@/entities/book/model";
import type { EmotionId } from "@/entities/emotion/model/types";


const PAGE_SIZE = 8;


export function useTodayRecordCount(animalId?: string) {
  return useQuery({
    queryKey: animalId ? recordKeys.todayCount(animalId) : [...recordKeys.all, "todayCount", "empty"],
    queryFn: () => {
      if (!animalId) throw new Error("No animalId");

      return fetchTodayRecordCount(animalId!)
    },
    enabled: !!animalId,
    staleTime: 1000 * 60,
  });
}


function formatDateText(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

/** ✅ 화면(View)에서 바로 쓰는 조인된 Record 상세 */
export function useRecordDetail(recordId?: string) {
  return useQuery({
    queryKey: recordKeys.detail(recordId ?? "unknown"),
    enabled: !!recordId,
    queryFn: async (): Promise<RecordListItemModel> => {
      if (!recordId) throw new Error("No recordId");
      
      const r = await db.records.get(recordId);
      if (!r) throw new Error("Record not found");

      const [b, a] = await Promise.all([
        db.books.get(r.bookId),
        db.animals.get(r.animalId),
      ]);

      if (!b) throw new Error("Book not found");
      if (!a) throw new Error("Animal not found");

      return {
        id: r.id,
        bookInfo: b as unknown as BookInfo,
        animalInfo: a as unknown as AnimalInfo,
        genreSnapshot: r.genreSnapshot ?? "Unknown",
        stageSnapshot: r.stage ?? 1,
        date: formatDateText(r.date),
        memo: r.memo ?? undefined,
        emotionId: (r.emotionId ?? 1) as EmotionId,
      };
    },
  });
}

export function useRecordList(params: {
  animalId?: string | null;
  bookId?: string | null;
  limit?: number;
  enabled?: boolean;
}) {
  const animalId = params.animalId ?? null;
  const bookId = params.bookId ?? null;
  const limit = params.limit ?? PAGE_SIZE;

  return useInfiniteQuery({
    queryKey: recordKeys.list({ animalId, bookId }),
    enabled: params.enabled ?? true,
    initialPageParam: null as string | null,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    queryFn: ({ pageParam }) =>
      fetchRecordListPage({
        animalId,
        bookId,
        cursor: (pageParam as string | null) ?? null,
        limit,
      }),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
  });
}