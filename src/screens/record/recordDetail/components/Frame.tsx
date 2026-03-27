import React from "react";
import { ui } from "@/assets/images";



type FrameProps = {
  children: React.ReactNode;
  className?: string;
};

function Frame({ children, className }: FrameProps) {
  return (
    <div
      className={[
        "relative px-4 pt-5 pb-3 min-h-0 flex-1 flex flex-col gap-25", 
        "bg-[#F3E4CF]", 
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 📄 종이 질감 레이어 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${ui("paper.png")})`,
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }}
      />

      {/* 🎀 상단 커튼 */}
      <img
        src={ui("curtain.png")}
        alt=""
        className="absolute top-0 left-0 w-full pointer-events-none z-10"
        style={{ imageRendering: "pixelated" }}
      />

      {/* 🧱 하단 장식 */}
      <img
        src={ui("flower.png")}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="relative z-20 flex flex-col h-full gap-1 mb-5 w-full">
        {children}
      </div>
    </div>
  );
}

export default Frame;
