import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

type Props = {
  todayRecordCount: number;
  streak: number;
};

export default function HomeStatsCard({
  todayRecordCount,
  streak,
}: Props) {
  return (
    <div className="flex justify-center">
      <NineSliceBox
        frameUrl={ui("small_scroll.png")}
        slice="24 48 24 48"
        borderWidth="12px 40px 14px 40px"
        imageWidth="12px 10px 12px 10px"
        className="h-18 w-full max-w-80 place-content-center"
      >
        <div className="flex items-center justify-center px-4 text-center">
          <div className="flex flex-1 items-center justify-center gap-1.5 self-center">
            <span className="text-sm">오늘</span>
            <span className="text-base font-semibold">{todayRecordCount}</span>
          </div>

          <div className="mx-3 h-6 w-px bg-[#cdbda7]" />

          <div className="flex flex-1 items-center justify-center gap-1.5 self-center">
            <span className="text-sm">연속</span>
            <span className="text-base font-semibold">{streak}</span>
            <span className="text-sm">일</span>
          </div>
        </div>
      </NineSliceBox>
    </div>
  );
}