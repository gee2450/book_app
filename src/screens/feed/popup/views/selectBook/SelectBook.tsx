import { useMemo, useState } from "react";
import BookItem from "./BookItem";
import { useBookList } from "@/entities/book/data/queries";
import type { BookInfo, DraftBook } from "@/entities/book/model";

export default function SelectBookView({
  draftBooks,
  onAddClick,
  onSelect,
  onClose,
}: {
  draftBooks?: DraftBook[] | null;
  onAddClick: () => void;
  onSelect: (selected: DraftBook | BookInfo) => void;
  onClose: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string>();
  const [isDraft, setIsDraft] = useState<boolean>(false);

  const { data, isLoading } = useBookList({});

  // 무한스크롤이면 pages.flatMap 필요
  const realBooks = useMemo(() => {
    const pages = data?.pages ?? [];
    return pages.flatMap((p) => p.items);
  }, [data]);

  const handleRealSelectId = (id: string) => {
    setSelectedId((prev) => (prev === id ? undefined : id));
    setIsDraft(false);
  };

  const handleDraftSelectId = (id: string) => {
    setSelectedId((prev) => {
      if (prev === id) {
        setIsDraft(false);
        return undefined;
      }

      setIsDraft(true);
      return id
    })
  };

  const handleSelect = () => {
    if (!selectedId) return;

    // draft 선택
    if (isDraft && draftBooks) {
      const book = draftBooks.find((b) => b.id === selectedId);
      if (book) {
        onSelect(book);
      }
      return;
    }

    // 기존 책 선택
    const book = realBooks.find((b) => b.id === selectedId);
    if (book) {
      onSelect(book);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 min-h-0">
      {/* 📚 리스트 */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto gap-1">

        {/* ✅ 1. draft는 항상 맨 위 */}
        {draftBooks && (
          draftBooks.map((book) => (
            <BookItem
              key={book.id}
              item={book}
              selected={selectedId === book.id}
              badge="임시"
              onClick={() => handleDraftSelectId(book.id)}
            />))
        )}

        {/* ✅ 2. 실제 DB 책들 */}
        {isLoading ? (
          <div className="py-6 text-center opacity-60">불러오는 중…</div>
        ) : realBooks.length === 0 ? (
          <div className="py-6 text-center opacity-60">
            책이 없습니다.
          </div>
        ) : (
          realBooks.map((book) => (
            <BookItem
              key={book.id}
              item={book}
              selected={selectedId === book.id}
              onClick={() => handleRealSelectId(book.id)}
            />
          ))
        )}
      </div>

      {/* ➕ 새 책 추가 */}
      <button
        className="w-full rounded-xl border border-dashed border-black/25 bg-white/25 px-3 py-3 hover:bg-white/35"
        onClick={onAddClick}
      >
        ＋ 새 책 추가
      </button>

      {/* 하단 버튼 */}
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-xl border border-black/25 bg-white/35 py-3 font-extrabold hover:bg-white/45"
          onClick={onClose}
        >
          취소
        </button>

        <button
          className={[
            "flex-1 rounded-xl border border-black/25 py-3 font-extrabold",
            selectedId
              ? "bg-orange-300 hover:bg-orange-300/80"
              : "bg-orange-300/50 cursor-not-allowed",
          ].join(" ")}
          disabled={!selectedId}
          onClick={handleSelect}
        >
          {isDraft ? "책 편집 후 선택" : "선택"}
        </button>
      </div>
    </div>
  );
}