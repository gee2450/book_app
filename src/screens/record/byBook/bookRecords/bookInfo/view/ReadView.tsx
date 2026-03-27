import type { BookInfo } from "@/entities/book/model/types";
import { ReadBookCover } from "@/screens/components";


function Label({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] font-semibold text-black/70">{children}</div>;
}


export default function ReadView({
  book,
}: {
  book: BookInfo;
}) {
  return (
    <div className="flex flex-col items-stretch gap-4">
      {/* 표지 + 메타(중앙 정렬) */}
      <div className="flex flex-col items-center gap-3">
        <ReadBookCover image={book.image} />

        <div className="flex flex-col items-center text-center gap-1">
          <div className="text-[18px] font-extrabold text-black/85 leading-6 line-clamp-2">
            {book.title || "제목 없음"}
          </div>
          <div className="text-[13px] font-semibold text-black/55">
            {book.genre || "Unknown"}
          </div>
          <div className="text-[14px] font-semibold text-black/60">
            {book.author || "저자 미입력"}
          </div>
        </div>
      </div>

      <div className="border-b border-black/20"/>

      {/* 소개 */}
      <div className="flex flex-col gap-2">
        <Label>책 소개</Label>
        <div
          className={[
            "rounded-md border border-black/20",
            "px-3 py-3 text-[14px] leading-6 text-black/80",
            "min-h-27.5",
            "whitespace-pre-wrap",
          ].join(" ")}
        >
          {book.memo ? (
            book.memo
          ) : (
            <span className="text-black/40">소개가 없어요</span>
          )}
        </div>
      </div>
    </div>
  );
}
