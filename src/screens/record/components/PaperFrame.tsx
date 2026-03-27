import React from "react";
import { ui } from "@/assets/images";


type Props = {
  children: React.ReactNode;
  className?: string;
};

function PaperFrame({ children, className }: Props) {
  return (
    <div
      className={[
        "relative",
        "w-full h-full min-h-0",
        "flex flex-col",
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
          backgroundImage: `url(${ui("paper.png")})`,
          backgroundRepeat: "repeat",
          opacity: 0.5,
        }}
      />

      <div className="relative z-20 flex flex-col min-h-0 h-full gap-1 mb-5 w-full">
        {children}
      </div>
    </div>
  );
}

export default PaperFrame;
