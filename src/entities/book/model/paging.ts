import type { BookDetailInfo } from "./types";

export type BookListPage = {
  items: BookDetailInfo[];
  total?: number;
  hasMore: boolean;
  nextCursor?: string | null;
};