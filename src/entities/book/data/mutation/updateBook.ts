import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { db } from "@/shared/infra/db/appDb";
import { bookKeys } from "../keys";
import type { BookInfo } from "@/entities/book/model/types";
import type { BookListPage } from "../../model/paging";
import type { RecordListItemModel } from "@/entities/record/model/types";
import type { RecordListPage } from "@/entities/record/model/paging";


/**
 * 책 수정 (React Query Mutation)
 * - DB update
 * - book detail cache patch
 * - book list cache patch
 * - record cache patch
 * - records에서 최신순만 cache patch
 */
export function useUpdateBook() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (next: BookInfo) => {
      // Dexie update: 부분 수정 (없으면 0 리턴)
      const count = await db.books.update(next.id, {
        title: next.title,
        author: next.author ?? null,
        genre: next.genre,
        img: next.image ?? null,
        memo: next.memo ?? null,
        updatedAt: next.updatedAt
      });

      if (count !== 1) {
        throw new Error("Book not found (update failed)");
      }

      return next;
    },

    onSuccess: async (next) => {
      // 1) detail 즉시 반영
      qc.setQueryData<BookInfo>(bookKeys.detail(next.id), next);

      // 2) book list들에서 해당 item patch (all pages)
      qc.setQueriesData<InfiniteData<BookListPage>>(
        { queryKey: ["books"] }, (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((it) => (it.id === next.id ? { ...it, ...next } : it)),
            })),
          };
        }
      );

      // 3) records가 book join 정보를 들고 있다면: 안전하게 invalidate
      qc.setQueriesData<InfiniteData<RecordListPage>>(
        { queryKey: ["records", {"bookId": "all"}] }, (old) => {
          if (!old?.pages) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              items: page.items.map((it) => (it.bookInfo.id === next.id ? {
                ...it, 
                bookInfo: next
              } : it)),
            })),
          };
        });

      // 4) book join한 record patch
      qc.setQueriesData<RecordListItemModel>(
        { queryKey: ["record"]}, (old) => {
          if (!old) return old;
          
          if (old.bookInfo.id === next.id) {
            return {
              ...old,
              bookInfo: next
            }
          }
          
          return old;
        }
      );
    },
  });
}