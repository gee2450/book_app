import type { Genre } from "./types";

export const genreLabel: Record<Genre, string> = {
  Literature: "문학",
  HumanitiesSocial: "인문·사회",
  ScienceTechnology: "과학·기술",
  ArtEssay: "예술·에세이",
  PracticalSelfHelp: "실용·자기관리",
  Unknown: "잘 모르겠어요",
};

export const GENRES = [
  'Literature',
  'HumanitiesSocial',
  'ScienceTechnology',
  'ArtEssay',
  'PracticalSelfHelp',
  'Unknown',
] as const;