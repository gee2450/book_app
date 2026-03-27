import { EMOTION_MAP } from "@/entities/emotion/model/emotions";
import type { EmotionId } from "@/entities/emotion/model/types";

type Props = {
  emotionId?: EmotionId | null;
  size?: number;
  className?: string;
};

export default function EmotionIcon({ emotionId, size = 28, className }: Props) {
  if (!emotionId) {
    return (
      <div
        className={className}
        style={{ width: size, height: size }}
      />
    );
  }

  const emotion = EMOTION_MAP[emotionId];

  return (
    <img
      src={emotion.img}
      alt=""
      draggable={false}
      className={className}
      style={{ width: size, height: size, imageRendering: "pixelated" }}
    />
  );
}
