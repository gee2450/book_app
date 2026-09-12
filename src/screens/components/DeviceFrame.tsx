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
        frameUrl={ui("home.png")}
        slice="70"
        borderWidth="20px 20px 110px 20px"
        imageWidth="70px"
        fill
        className={[
          "h-full",
          "flex flex-col gap-2.5 p-2.5",
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
          className="
            absolute
            inset-x-0
            bottom-0
            z-10
            h-27.5
            flex
            items-end
            justify-center
            pb-13
            text-sm
            font-semibold
            tracking-wide
            text-[#584036]
            transition-opacity
            hover:opacity-70
            active:opacity-50
          "
        >
          ✦ DEV MODE ✦
        </button>
      )}
    </div>
  );
}

export default HomeFrame;
