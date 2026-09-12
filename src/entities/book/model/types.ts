export const GENRE = {
  Literature: "Literature",
  HumanitiesSocial: "HumanitiesSocial",
  ScienceTechnology: "ScienceTechnology",
  ArtEssay: "ArtEssay",
  PracticalSelfHelp: "PracticalSelfHelp",
  Unknown: "Unknown",
} as const;

export type Genre = (typeof GENRE)[keyof typeof GENRE];


/**
 * #### 책의 정보
 * id, title, genre, author, image, memo
 */
export interface BookInfo {
  id: string;
  title: string;
  genre: Genre;
  author?: string | null;
  image?: Blob | null;
  memo?: string | null;
  updatedAt: string;
}

export type DraftBook = Omit<BookInfo, "updatedAt"> & {
  isDraft: true;
};

/**
 * #### 책의 상세 정보 (BookInfo + recordCount)
 */
export interface BookDetailInfo extends BookInfo {
  recordCount: number;
}