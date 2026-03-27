import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type RecordDetailBottomBarProps = {
  className?: string;
};

export default function BottomBar({
  className,
}: RecordDetailBottomBarProps) {
  return (
    <NineSliceBox
      frameUrl={ui("record_detail_bottom.png")}
      slice="20 60 20 70"
      borderWidth="10px 30px 10px 30px"
      imageWidth="10px 30px 10px 30px"
      className={["w-full h-18 shrink-0", className].filter(Boolean).join(" ")}
    >
      {/* 장식용이라 내부는 비워둠 */}
    </NineSliceBox>
  );
}
