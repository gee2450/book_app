import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

import type { ReactNode, CSSProperties } from "react";

const SLICE = "50";
const BORDER = "12px";
const IMAGE_WIDTH = "16px 15px 16px 15px";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export default function FrameBox({
  children,
  className,
  style,
}: Props) {
  return (
    <NineSliceBox
      className={[
        "relative z-10",
        "flex flex-col gap-1",
        "text-center",
        "text-md",
        "leading-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      frameUrl={ui("frame.png")}
      slice={SLICE}
      borderWidth={BORDER}
      imageWidth={IMAGE_WIDTH}
      fill={false}
      style={{
        imageRendering: "pixelated",
        ...style,
      }}
    >
      {children}
    </NineSliceBox>
  );
}