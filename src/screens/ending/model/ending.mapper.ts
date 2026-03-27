import type { Genre } from "@/entities/book/model/types";

import ending1 from "@/assets/images/animals/fox/endings/ending1.png";
import ending2 from "@/assets/images/animals/fox/endings/ending2.png";
import ending3 from "@/assets/images/animals/fox/endings/ending3.png";
import ending4 from "@/assets/images/animals/fox/endings/ending4.png";
import ending5 from "@/assets/images/animals/fox/endings/ending5.png";
import ending6 from "@/assets/images/animals/fox/endings/ending6.png";

export function getEndingImageByGenre(genre?: Genre | null) {
  switch (genre) {
  case "Literature":
    return ending1;
  case "HumanitiesSocial":
    return ending2;
  case "ScienceTechnology":
    return ending3;
  case "ArtEssay":
    return ending4;
  case "PracticalSelfHelp":
    return ending5;
  case "Unknown":
  default:
    return ending6;
  }
}

export function getEndingTitleByGenre(genre?: Genre | null) {
  switch (genre) {
  case "Literature":
    return "이야기 작가";
  case "HumanitiesSocial":
    return "기록 연구가";
  case "ScienceTechnology":
    return "별 관측가";
  case "ArtEssay":
    return "풍경 화가";
  case "PracticalSelfHelp":
    return "시간 설계자";
  case "Unknown":
  default:
    return "여행자";
  }
}