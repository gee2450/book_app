import EmotionIcon from "@/entities/emotion/ui/emotionIcon";
import type { RecordListItemModel } from "@/entities/record/model/types";
import { NineSliceBox } from "@/shared";
import { ui } from "@/assets/images";
import { formatDisplayDate } from "@/shared/lib/date";


export default function RecordListItem({
  item,
  onClick,
}: {
  item: RecordListItemModel;
  onClick?: (item: RecordListItemModel) => void;
}) {
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
        <div className="flex gap-4 p-2">
          <div className="shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden">
            {item.emotionId ? (
              <EmotionIcon emotionId={item.emotionId} size={44} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-black/5" />
            )}
          </div>

          <div className={[
            "min-w-0 flex flex-col flex-1 self-center",
            item.memo ? "gap-2" : "",
          ].join(" ")}>
            <div className="font-bold text-[20px] leading-none">{formatDisplayDate(item.date)}</div>
            {item.memo ?? (
              <div className="mt-2 text-[16px] text-black/70 line-clamp-1">{item.memo}</div>
            )}
          </div>
        </div>
      </NineSliceBox>
    </button>
  );
}