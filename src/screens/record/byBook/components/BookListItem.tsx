import NineSliceBox from "@/shared/NineSliceBox";
import type { BookDetailInfo } from "@/entities/book/model/types";
import { ui } from "@/assets/images";
import { useObjectUrl } from "@/shared/lib/useObjectUrl";


type Props = {
  item: BookDetailInfo;
  fallbackCoverUrl: string;
  onClick?: (item: BookDetailInfo) => void;
};

export default function BookListItem({
  item,
  fallbackCoverUrl,
  onClick,
}: Props) {
  const objectUrl = useObjectUrl(item.image ?? null);
  const coverSrc = objectUrl ?? fallbackCoverUrl;

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="w-full text-left active:scale-[0.99]"
    >
      <NineSliceBox
        frameUrl={ui("record_card.png")}
        slice="60 80 110 80"   // ← 가로 확장 중심 (값은 이미지에 맞게 조절)
        borderWidth="14px"
        imageWidth="28px"
        className="w-full"
      >
        <div className="flex items-center gap-4 px-3 py-2">
          {/* 📕 커버 */}
          <div className="shrink-0 w-14 h-14 rounded-md overflow-hidden bg-black/10">
            <img
              src={coverSrc}
              alt={item.title}
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* 📄 텍스트 영역 */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              {/* 제목 */}
              <div className="font-extrabold text-[18px] leading-tight line-clamp-2">
                {item.title}
              </div>

              {/* 📊 기록 개수 */}
              <div className="shrink-0 flex items-center gap-1">
                <span className="text-black/50 text-sm">기록</span>
                <span className="text-[20px] font-extrabold">
                  {item.recordCount}
                </span>
              </div>
            </div>
            
            {/* 장르 · 작가 */}
            <div className="mt-1 text-[14px] text-black/60 flex gap-2">
              <span className="shrink-0">{item.genre}</span>
              {item.author ? (
                <>
                  <span className="text-black/30">·</span>
                  <span className="min-w-0 ">{item.author}</span>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </NineSliceBox>
    </button>
  );
}
