import React from "react";
import { NineSliceBox } from "@/shared";
import { ui } from "@/assets/images";


type Props = {
  children: React.ReactNode;
  className?: string;
};

function Frame({ children, className }: Props) {
  return (
    <div
      className={[
        "relative",
        "w-full h-full min-h-0",
        "flex flex-col",
        "bg-[#F3E4CF]", 
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* 배경 */}
      <div
        className="absolute w-full inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${ui("library.png")})`,
          backgroundRepeat: "repeat",
          backgroundSize: 'cover',
          backgroundPosition: 'bottom',
        }}
      />

      <NineSliceBox
        frameUrl={ui("book_box.png")}
        slice="95"
        borderWidth="20px"
        imageWidth="40px"
        fill
        className={[
          "relative z-20 max-h-[80%] min-h-92",
          "flex flex-col justify-between gap-2",
          "mx-5 my-auto box-border py-1",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </NineSliceBox>
    </div>
  );
}

export default Frame;
