import NineSliceBox from "@/shared/NineSliceBox";
import unknownFoxUrl from "@/assets/images/animals/fox/unknown.png";
import { ui } from "@/assets/images";


type Props = {
  name: string;
  imgUrl: string;
  metCount: number;
  onClick?: () => void;
  className?: string;
};

export default function ListItem({
  name,
  imgUrl,
  metCount,
  onClick,
  className,
}: Props) {
  const isUnknown = metCount === 0;

  return (
    <button
      type="button"
      onClick={isUnknown ? undefined : onClick}
      disabled={isUnknown}
      className="w-full text-left"
    >
      <NineSliceBox
        frameUrl={ui('collection_card.png')}
        slice="120 300 120 300"
        borderWidth="5px"
        imageWidth="20px 50px 20px 50px"
        fill
        style={{ borderImageRepeat: "stretch" }}
        className={[
          "w-full",
          "p-3",
          "flex flex-col",
          "justify-between",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* 이미지 영역 */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={isUnknown ? unknownFoxUrl : imgUrl}
            alt={isUnknown ? "unknown fox" : name}
            className="
              w-[78%] max-h-full
              object-contain
              pointer-events-none
              select-none
            "
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="flex flex-col mt-2 mb-1 gap-1.5 text-center">
          <div className="text-base font-black text-[#3B2A1A]">
            {isUnknown ? "??? 여우" : name}
          </div>

          <div className="text-xs font-bold text-[#3B2A1A]/80">
            {isUnknown ? "아직 만난 적이 없어요" : `만난 횟수: ${metCount}회`}
          </div>
        </div>
      </NineSliceBox>
    </button>
  );
}
