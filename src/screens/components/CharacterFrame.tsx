import type { ReactNode } from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

type CharacterFrameProps = {
  children: ReactNode;
  height?: number;
  className?: string;
  backgroundUrl?: string;
  bottomSlot?: ReactNode;
};

function CharacterFrame({
  children,
  height,
  className,
  backgroundUrl = ui("background.png"),
  bottomSlot,
}: CharacterFrameProps) {
  const SLICE = "64";
  const BORDER = "24px";
  const IMAGE_WIDTH = "24px";

  return (
    <div
      className={[
        "min-h-50 max-h-80 flex flex-col items-center mt-2",
        bottomSlot ? "mb-6" : "mb-1",
        height ? "" : "flex-1",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={height ? { height } : undefined}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-full h-full">
          {/* inner mask 적용 영역 */}
          <div
            className="absolute inset-0 m-1 rounded-xl overflow-hidden"
            style={{
              WebkitMaskImage: `url(${ui("inner_mask.png")})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              WebkitMaskPosition: "center",

              maskImage: `url(${ui("inner_mask.png")})`,
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
              maskPosition: "center",
            }}
          >
            {/* background */}
            <img
              src={backgroundUrl}
              alt="background"
              className="absolute inset-0 w-full h-full object-cover object-[center_bottom]"
              draggable={false}
            />

            {/* content */}
            <div className="relative w-full h-full">
              {children}
            </div>
          </div>

          {/* frame */}
          <NineSliceBox
            frameUrl={ui("frame.png")}
            slice={SLICE}
            borderWidth={BORDER}
            imageWidth={IMAGE_WIDTH}
            fill={false}
            className="absolute inset-0 z-10"
          />

          {/* bottom slot */}
          {bottomSlot && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
              {bottomSlot}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterFrame;