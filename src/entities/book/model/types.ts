export type Genre =
  | 'Literature'         // 문학
  | 'HumanitiesSocial'   // 인문·사회
  | 'ScienceTechnology'  // 과학·기술
  | 'ArtEssay'           // 예술·에세이
  | 'PracticalSelfHelp'  // 실용·자기관리
  | 'Unknown';           // 잘 모르겠어요


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