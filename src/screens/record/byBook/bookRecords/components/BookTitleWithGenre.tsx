import { NineSliceBox } from "@/shared";
import { ui } from "@/assets/images/ui/ui"


function GenreBadge({ text }: { text: string }) {
  return (
    <NineSliceBox
      frameUrl={ui("genre_box.png")}
      slice="200 300 200 300"
      borderWidth="10px"
      imageWidth="12px 25px 12px 25px"
      className="inline-flex h-9 items-center justify-center px-4"
      style={{ imageRendering: "pixelated" }}
    >
      <span className="text-[14px] font-bold text-black/80 truncate">{text}</span>
    </NineSliceBox>
  );
}

export default function BookTitleWithGenre({ title, genre }: { title: string; genre: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="max-w-[92%] text-center font-extrabold text-xl leading-snug line-clamp-2">
        {title}
      </div>
      <GenreBadge text={genre} />
    </div>
  );
}