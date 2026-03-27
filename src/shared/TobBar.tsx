import React from "react";
import { ui } from "@/assets/images";


export type TopBarProps = {
  title?: React.ReactNode;
  onBack: () => void;

  rightActions?: React.ReactNode; // ✅ 슬롯
  className?: string;
  showBottomStrip?: boolean;
};

function TopBar({
  title,
  onBack,
  rightActions,
  showBottomStrip = true,
  className,
}: TopBarProps) {
  return (
    <header
      className={[
        "relative w-full h-15 px-2",
        "flex items-center shrink-0 box-border",
        "bg-[#EED6D4]",
        className,
      ].join(" ")}
    >
      {/* 종이 질감 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${ui("paper.png")})`,
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }}
      />

      {/* 하단 장식 */}
      {showBottomStrip && (
        <div className="absolute left-0 right-0 -bottom-px pointer-events-none">
          <div className="h-px bg-[#AD8D7C]" />
          <div className="h-0.75 bg-[#F4D1B5]" />
          <div className="h-px bg-[#957361]" />
        </div>
      )}

      <div className="relative z-10 flex items-center w-full">
        {/* Back */}
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
          className="w-12 h-12 flex items-center justify-center active:scale-95"
        >
          <span className="text-3xl leading-none text-[#3B2A1A]">←</span>
        </button>

        {/* Title */}
        <div className="flex-1 flex justify-center">
          {title && (
            <div className="text-2xl font-black leading-none translate-y-px text-[#3B2A1A]">
              {title}
            </div>
          )}
        </div>

        {/* Right actions */}
        <div className="w-12 h-12 flex items-center justify-center">
          {rightActions}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
