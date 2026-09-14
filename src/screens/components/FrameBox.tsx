import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

import type { ReactNode, CSSProperties } from "react";

const SLICE = "50 50 50 50";
const BORDER = "10px 12px 10px 12px";
const IMAGE_WIDTH = "12px 13px 12px 13px";

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
      frameUrl={ui("frame.webp")}
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