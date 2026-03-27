import type { DraftBook, Genre } from "@/entities/book/model/types";
import { db } from "@/shared/infra/db/appDb";

function trimOrUndefined(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function normalizeTitle(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function hasDuplicateTitle(title: string) {
  const normalized = normalizeTitle(title);
  const all = await db.books.toArray();

  return all.some((book) => normalizeTitle(book.title) === normalized);
}

type BuildDraftBookParams = {
  draftId: string;
  initialDraft?: DraftBook | null;
  title: string;
  author: string;
  genre: Genre;
  image: Blob | null;
  memo: string;
};

export function buildDraftBook({
  draftId,
  initialDraft,
  title,
  author,
  genre,
  image,
  memo,
}: BuildDraftBookParams): DraftBook {
  return {
    id: initialDraft?.id ?? draftId,
    isDraft: true,
    title: title.trim(),
    author: trimOrUndefined(author),
    genre,
    image: image ?? null,
    memo: trimOrUndefined(memo),
  };
}