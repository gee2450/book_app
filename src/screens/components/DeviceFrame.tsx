import React from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

type HomeFrameProps = {
  children: React.ReactNode;
  className?: string;
  onDevModeClick?: () => void;
};

function HomeFrame({
  children,
  className,
  onDevModeClick,
}: HomeFrameProps) {  
  return (
    <div className="relative h-full">
      <NineSliceBox
        id="home-frame"
        frameUrl={ui("home.webp")}
        slice="70 70 110 70"
        borderWidth="20px 20px 100px 20px"
        imageWidth="70px 70px 100px 70px"
        fill
        className={[
          "h-full",
          "flex flex-col p-2.5 pb-0",
          "bg-[#F8EAD8]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </NineSliceBox>

      {onDevModeClick && (
        <button
          type="button"
          onClick={onDevModeClick}
          className="absolute inset-x-0 bottom-0 
            flex z-10 h-23
            items-center justify-center
            text-sm font-semibold pb-6
            tracking-wide
            text-[#584036]
            transition-opacity
            hover:opacity-70
            active:opacity-50"
        >
          ✦ DEV MODE ✦
        </button>
      )}
    </div>
  );
}

export default HomeFrame;
