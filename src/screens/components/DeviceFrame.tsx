import React from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type HomeFrameProps = {
  children: React.ReactNode;
  className?: string;
};

function HomeFrame({ children, className }: HomeFrameProps) {
  return (
    <NineSliceBox
      frameUrl={ui("home.png")}
      slice="70"
      borderWidth="20px 20px 110px 20px"
      imageWidth="70px"
      fill
      className={[
        "h-full min-h-147.5",
        "flex flex-col gap-2.5 p-2.5",
        "bg-[#F8EAD8]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </NineSliceBox>
  );
}

export default HomeFrame;
