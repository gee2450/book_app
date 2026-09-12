import { GENRE, type Genre } from "@/entities/book/model";

type GenreOption = {
  value: Genre;
  label: string;
};

const GENRE_OPTIONS: GenreOption[] = [
  { value: GENRE.Literature, label: "문학" },
  { value: GENRE.HumanitiesSocial, label: "인문·사회" },
  { value: GENRE.ScienceTechnology, label: "과학·기술" },
  { value: GENRE.ArtEssay, label: "예술·에세이" },
  { value: GENRE.PracticalSelfHelp, label: "실용·자기관리" },
  { value: GENRE.Unknown, label: "잘 모르겠어요" },
];

export default function GenreSelect({
  value,
  onChange,
}: {
  value?: Genre;
  onChange: (value: Genre) => void;
}) {
  return (
    <select
      title="genre-select"
      className={[
        "w-full",
        "text-base",
        "text-[#3B2A1A] placeholder:text-[#3B2A1A]/60",
        "bg-transparent",
        "outline-none",
        "border rounded border-black/40 py-1.5 pl-1",
      ].join(" ")}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value as Genre)}
    >
      {GENRE_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
