import type { BookInfo, Genre } from "@/entities/book/model/types";
import type { EmotionId } from "@/entities/emotion/model/types";
import EmotionIcon from "@/entities/emotion/ui/emotionIcon";

type TopBannerProps = {
  book: BookInfo;
  genreSnapshot: Genre;
  dateText: string;
  emotionId: EmotionId | null | undefined;
  readOnly: boolean;
};

export default function TopBanner({
  book,
  genreSnapshot,
  dateText,
  emotionId,
  readOnly,
}: TopBannerProps) {
  return (
    <>
      {/* 책 정보 */}
      <div className="flex flex-col gap-2 mb-1">
        <div className="text-[1.2rem] font-black leading-snug text-center">
          {book.title}
        </div>

        <div className="text-sm text-black/60 text-center">
          {book.author ? `${book.author} · ` : ""}
          {book.genre}
        </div>
      </div>

      {/* 구분선 */}
      <div className="h-px shrink-0 mx-auto w-[90%] bg-[#B7978D]" />

      {/* 날짜 */}
      <div className="flex self-center gap-2">
        <div className="text-base text-center text-black/70">{dateText}</div>
        {readOnly ? <EmotionIcon emotionId={emotionId} /> : null}
      </div>

      {book.genre !== genreSnapshot && (
        <div className="text-xs text-red-500 text-center mt-1">
          장르가 변경되었습니다
        </div>
      )}
    </>
  );
}
