import NineSliceBox from "@/shared/NineSliceBox";
import EmotionIcon from "@/entities/emotion/ui/emotionIcon";
import type { RecordListItemModel } from "@/entities/record/model/types";
import { ui } from "@/assets/images";
import { formatDisplayDate } from "@/shared/lib/date";


type Props = {
  item: RecordListItemModel;
  onClick?: (item: RecordListItemModel) => void;
};

export default function RecordListItem({
  item,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="w-full text-left active:scale-[0.99]"
    >
      <NineSliceBox
        frameUrl={ui("record_card.png")}
        slice="110 100 150 100"
        borderWidth="15px"
        imageWidth="30px"
        className="w-full"
      >
        <div className="flex gap-4 p-1">
          <div className="shrink-0 w-10 h-10 flex items-center justify-center overflow-hidden">
            <EmotionIcon emotionId={item.emotionId} size={40} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="font-extrabold text-[18px] leading-snug line-clamp-2">
              {item.bookInfo.title}
            </div>

            <div className="mt-1 flex items-center justify-between text-sm text-black/60">
              <span className="truncate">{item.bookInfo.genre}</span>
              <span className="shrink-0">{formatDisplayDate(item.date)}</span>
            </div>

            {/* 메모 미리보기 */}
            {item.memo ? (
              <div className="mt-3 text-[15px] text-black/70 line-clamp-2">
                {item.memo}
              </div>
            ) : (
              <div className="mt-3 text-[15px] text-black/30">
                메모가 없어요
              </div>
            )}
          </div>
        </div>
      </NineSliceBox>
    </button>
  );
}
