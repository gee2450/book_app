import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type Props = {
  count: number;
};

export default function BookCountBanner({ count }: Props) {
  return (
    <NineSliceBox
      frameUrl={ui("book_cnt_box.png")}
      slice="50 150 70 150"
      borderWidth="10px"
      imageWidth="20px 65px 20px 65px"
      className="w-70 h-14 flex items-center justify-center mx-auto"
      style={{ imageRendering: "pixelated" }}
    >
      <span className="text-[20px] text-[#F3E4CF] tracking-wide">
        책 {count}권
      </span>
    </NineSliceBox>
  );
}
