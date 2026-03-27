import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "@/shared/TobBar";

import type { BookInfo } from "@/entities/book/model/types";
import View from "./view/View";

import { useBookDetail } from "@/entities/book/data/queries";
import { useUpdateBook } from "@/entities/book/data/mutation/updateBook";

export default function BookInfoScreen() {
  const navigate = useNavigate();
  const { bookId } = useParams<{ bookId: string }>();

  const updateBook = useUpdateBook();

  // bookId 없으면 쿼리 실행하지 않게 가드
  const bookQuery = useBookDetail(bookId ?? "");

  const book: BookInfo | null = useMemo(() => {
    if (!bookId) return null;
    const row = bookQuery.data;
    if (!row) return null;
    return row;
  }, [bookId, bookQuery.data]);

  const isLoading = !!bookId && bookQuery.isLoading;

  const onSave = useCallback(
    (newBook: BookInfo) => {
      if (!book) return;
      if (book.id !== newBook.id) return;

      const isSame =
        book.title === newBook.title &&
        (book.author ?? "") === (newBook.author ?? "") &&
        book.genre === newBook.genre &&
        (book.image ?? null) === (newBook.image ?? null) &&
        (book.memo ?? "") === (newBook.memo ?? "");

      if (isSame) return;

      updateBook.mutate(newBook);
    },
    [book, updateBook]
  );

  if (!bookId) {
    return (
      <div className="flex flex-col h-full w-full">
        <TopBar title="책 정보" onBack={() => navigate(-1)} />
        <div className="flex-1 flex items-center justify-center text-black/50">
          책을 찾을 수 없어요
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-full w-full">
        <TopBar title="책 정보" onBack={() => navigate(-1)} />
        <div className="flex-1 flex items-center justify-center text-black/50">
          불러오는 중...
        </div>
      </div>
    );
  }

  if (!book || bookQuery.isError) {
    return (
      <div className="flex flex-col h-full w-full">
        <TopBar title="책 정보" onBack={() => navigate(-1)} />
        <div className="flex-1 flex items-center justify-center text-black/50">
          책을 찾을 수 없어요
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full min-h-0">
      {/* 저장 중 UI 필요하면 View에 isSaving 내려도 됨 */}
      <View key={book.id} book={book} onSave={onSave} />
      {/* 예: updateBook.isPending일 때 토스트/스피너 */}
    </div>
  );
}