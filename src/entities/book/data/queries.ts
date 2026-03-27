import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { db } from "@/shared/infra/db/appDb";
import { bookKeys } from "./keys";
import { fetchBookListPage } from "./fetchers";
import type { BookInfo } from "../model";

const PAGE_SIZE = 8;

/** 책 단건 */
export function useBookDetail(bookId: string) {
  return useQuery({
    queryKey: bookKeys.detail(bookId),
    queryFn: async () => {
      const row = await db.books.get(bookId);
      if (!row) throw new Error("Book not found");
      return {
        ...row,
        image: row.img
      } as BookInfo;
    },
  });
}

/**
 * 책 리스트 (무한스크롤)
 * - animalId 없으면 전체 책
 * - animalId 있으면 해당 동물이 읽은 책만
 */
export function useBookList(
  params: { animalId?: string | null; limit?: number; enabled?: boolean },
) {
  const animalId = params.animalId ?? null;
  const limit = params.limit ?? PAGE_SIZE;
  const enabled = params.enabled ?? true;

  return useInfiniteQuery({
    queryKey: bookKeys.list({ animalId }),
    enabled,
    initialPageParam: null as string | null,
    queryFn: ({ pageParam }) =>
      fetchBookListPage({
        animalId,
        cursor: (pageParam as string | null) ?? null,
        limit,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
  });
}