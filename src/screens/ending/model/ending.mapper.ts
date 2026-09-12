import { GENRE, type Genre } from "@/entities/book/model/types";

import ending1 from "@/assets/images/animals/fox/endings/ending1.png";
import ending2 from "@/assets/images/animals/fox/endings/ending2.png";
import ending3 from "@/assets/images/animals/fox/endings/ending3.png";
import ending4 from "@/assets/images/animals/fox/endings/ending4.png";
import ending5 from "@/assets/images/animals/fox/endings/ending5.png";
import ending6 from "@/assets/images/animals/fox/endings/ending6.png";

export function getEndingImageByGenre(genre?: Genre | null) {
  switch (genre) {
  case GENRE.Literature:
    return ending1;
  case GENRE.HumanitiesSocial:
    return ending2;
  case GENRE.ScienceTechnology:
    return ending3;
  case GENRE.ArtEssay:
    return ending4;
  case GENRE.PracticalSelfHelp:
    return ending5;
  case GENRE.Unknown:
  default:
    return ending6;
  }
}

export function getEndingTitleByGenre(genre?: Genre | null) {
  switch (genre) {
  case GENRE.Literature:
    return "이야기 작가";
  case GENRE.HumanitiesSocial:
    return "기록 연구가";
  case GENRE.ScienceTechnology:
    return "별 관측가";
  case GENRE.ArtEssay:
    return "풍경 화가";
  case GENRE.PracticalSelfHelp:
    return "시간 설계자";
  case GENRE.Unknown:
  default:
    return "여행자";
  }
}