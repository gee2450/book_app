import emotion1 from "@/assets/images/animals/fox/emotion1.png";
import emotion2 from "@/assets/images/animals/fox/emotion2.png";
import emotion3 from "@/assets/images/animals/fox/emotion3.png";
import emotion4 from "@/assets/images/animals/fox/emotion4.png";

import type { EmotionId, EmotionOption } from "./types";

export const EMOTIONS: EmotionOption[] = [
  { id: 1, img: emotion1 },
  { id: 2, img: emotion2 },
  { id: 3, img: emotion3 },
  { id: 4, img: emotion4 },
];

export const EMOTION_MAP: Record<EmotionId, EmotionOption> = {
  1: EMOTIONS[0],
  2: EMOTIONS[1],
  3: EMOTIONS[2],
  4: EMOTIONS[3],
};
