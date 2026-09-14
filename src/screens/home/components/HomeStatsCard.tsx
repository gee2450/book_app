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
        frameUrl={ui("small_scroll.webp")}
        slice="60 48 60 48"
        borderWidth="12px 40px 15px 40px"
        imageWidth="12px 10px 12px 10px"
        className="w-full place-content-center"
      >
        <div className="flex items-center justify-center text-center">
          <div className="flex flex-1 items-center justify-center gap-1.5 self-center">
            <span className="text-sm">오늘</span>
            <span className="text-base font-semibold"
              style={{ position: "relative", top: "0.3px" }}
            >
              {todayRecordCount}
            </span>
          </div>

          <div className="mx-3 h-6 w-px bg-[#cdbda7]" />

          <div className="flex flex-1 items-center justify-center gap-1.5 self-center">
            <span className="text-sm">연속</span>
            <span className="text-base font-semibold"
              style={{ position: "relative", top: "0.3px" }}
            >
              {streak}
            </span>
            <span className="text-sm">일</span>
          </div>
        </div>
      </NineSliceBox>
    </div>
  );
}