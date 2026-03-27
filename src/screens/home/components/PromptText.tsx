import { useMemo } from "react";
import type { AnimalInfo } from "@entities/animal/model/types";
import { ui } from "@/assets/images";
import { FrameBox } from "@/screens/components";

type PromptTextProps = {
  animal: AnimalInfo;
  todayReadCount?: number;
  todayFeedCount?: number;
  className?: string;
};

function decidePromptText({
  animal,
  todayReadCount,
}: {
  animal: AnimalInfo;
  todayReadCount?: number;
  todayFeedCount?: number;
}) {
  const name = (animal.name ?? "").trim();

  if (!name) {
    return "여우에게 이름을 지어주세요";
  }

  if (typeof todayReadCount === "number" && todayReadCount >= 3) {
    return "오늘은 여러 권의 책을 읽어주셨네요!";
  }

  return "여우에게 밥을 주세요";
}

export default function PromptText({
  animal,
  todayReadCount,
  todayFeedCount,
  className,
}: PromptTextProps) {
  const text = useMemo(
    () =>
      decidePromptText({
        animal,
        todayReadCount,
        todayFeedCount,
      }),
    [animal, todayReadCount, todayFeedCount]
  );

  return (
    <div className="relative inline-block">
      {/* background mask */}
      <div
        className="absolute inset-0 m-[0.29rem] rounded-md bg-white/40"
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
      />

      <FrameBox
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
      >
        <span className="relative z-20">{text}</span>

        <div>
          <span className="relative z-20">
            오늘의 이야기를 들려줘서 고마워요
          </span>
        </div>
      </FrameBox>
    </div>
  );
}