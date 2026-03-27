import type { AnimalType } from "./types";

import storytellerFoxUrl from "@/assets/images/animals/fox/stage5/Literature/Collection.png";
import librarianFoxUrl from "@/assets/images/animals/fox/stage5/HumanitiesSocial/Collection.png";
import researcherFoxUrl from "@/assets/images/animals/fox/stage5/ScienceTechnology/Collection.png";
import artistFoxUrl from "@/assets/images/animals/fox/stage5/ArtEssay/Collection.png";
import architectFoxUrl from "@/assets/images/animals/fox/stage5/PracticalSelfHelp/Collection.png";
import travelerFoxUrl from "@/assets/images/animals/fox/stage5/Unknown/Collection.png";
import type { Genre } from "@/entities/book/model";

type AnimalJobAppearance = {
  name: string;
  genre: Genre;
  imgUrl: string;
};

export const ANIMAL_JOB_APPEARANCE: Record<
  AnimalType,
  Record<Genre, AnimalJobAppearance>
> = {
  fox: {
    Literature: {
      name: "이야기꾼 여우",
      genre: "Literature",
      imgUrl: storytellerFoxUrl,
    },
    HumanitiesSocial: {
      name: "사서 여우",
      genre: "HumanitiesSocial",
      imgUrl: librarianFoxUrl,
    },
    ScienceTechnology: {
      name: "연구원 여우",
      genre: "ScienceTechnology",
      imgUrl: researcherFoxUrl,
    },
    ArtEssay: {
      name: "예술가 여우",
      genre: "ArtEssay",
      imgUrl: artistFoxUrl,
    },
    PracticalSelfHelp: {
      name: "설계자 여우",
      genre: "PracticalSelfHelp",
      imgUrl: architectFoxUrl,
    },
    Unknown: {
      name: "책 여행자 여우",
      genre: "Unknown",
      imgUrl: travelerFoxUrl,
    },
  },

  // TODO: 나중에 이렇게 추가
  // cat: { ... },
  // bear: { ... },
};
