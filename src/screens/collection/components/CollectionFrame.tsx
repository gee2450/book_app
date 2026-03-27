import React from "react";
import { ui } from "@/assets/images";


type Props = {
  children: React.ReactNode;
  className?: string;
};

function CollectionFrame({ children, className }:Props) {
  return (
    <div
      className={[
        "relative",
        "min-h-0 w-full h-full",
        "overflow-hidden",
        "flex flex-col",
        "px-5", 
        "bg-[#F5DCD9]", 
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 📄 종이 질감 레이어 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${ui('paper.png')})`,
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }}
      />      

      {/* 🎀 상단 커튼 */}
      <img
        src={ui('curtain.png')}
        alt=""
        className="absolute top-0 left-0 w-full pointer-events-none z-10"
        style={{ imageRendering: "pixelated" }}
      />

      {/* 🧱 하단 장식 */}
      <img
        src={ui('feed_bottom.png')}
        alt=""
        className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
        style={{ imageRendering: "pixelated" }}
      />

      <div className="h-full w-full min-h-0 z-20 flex flex-col">
        {children}
      </div>
    </div>
  );
}

export default CollectionFrame;
