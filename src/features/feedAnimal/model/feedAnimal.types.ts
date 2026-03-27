import type { EmotionId } from "@/entities/emotion/model/types";
import type { CurrentAnimal } from "@/entities/animal/model/types";

export type FeedAnimalInput = {
  bookId: string;
  date?: string;
  emotionId: EmotionId;
  memo?: string | null;
};

export type FeedAnimalResult = {
  currentAnimal: CurrentAnimal;
};