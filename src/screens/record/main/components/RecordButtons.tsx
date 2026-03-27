import React from "react";
import { NineSliceBox } from "@/shared";
import { ui } from "@/assets/images";


function RecordButtons({
  onByDate,
  onByBook,
}: {
  onByDate?: () => void;
  onByBook?: () => void;
}) {
  return (
    <div className="w-full px-6">
      <div className="w-full max-w-105 mx-auto mt-4 flex flex-col gap-1.5">
        <RecordBigButton
          frameUrl={ui("record_button.png")}
          leftIcon={<span className="text-lg">🗓️</span>}
          label="날짜별로 보기"
          onClick={onByDate}
        />

        <RecordBigButton
          frameUrl={ui("record_button.png")}
          leftIcon={<span className="text-lg">🦊</span>}
          label="책별로 보기"
          onClick={onByBook}
        />
      </div>
    </div>
  );
}

function RecordBigButton({
  frameUrl,
  label,
  leftIcon,
  onClick,
}: {
  frameUrl: string;
  label: string;
  leftIcon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <NineSliceBox
        frameUrl={frameUrl}
        /**
         * ✅ 우선 안전값
         * - 테두리 두께가 두꺼운 편이면 숫자를 더 키워야 함
         * - 한번 적용해보고 모서리/테두리 깨지는 부분 보고 10~30 단위로 조정하면 됨
         */
        slice="130 220 130 220"
        borderWidth="10px"
        /**
         * NineSliceBox 구현마다 의미가 다를 수 있는데,
         * 너가 MemoPanel에서 쓰던 형태 그대로 맞췄어.
         */
        imageWidth="20px 35px 20px 35px"
        fill
        style={{
          borderImageRepeat: "stretch",
          imageRendering: "pixelated",
        }}
        className={[
          "relative",
          "w-full",
          "h-18",
          "px-5",
          "flex items-center justify-between",
          "transition",
          "opacity-100"
        ].join(" ")}
      >
        <div className="flex items-center gap-3">
          {leftIcon}
          <span className="text-xl font-black text-[#3B2A1A]">{label}</span>
        </div>

        <span className="text-2xl font-black text-[#3B2A1A]/80">›</span>
      </NineSliceBox>
    </button>
  );
}

export default RecordButtons;
