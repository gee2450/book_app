import CharacterFrame from "@/screens/components/CharacterFrame";
import AnimalImage from "./EggImage";
import BookImage from "./BookImage";
import { ui } from "@/assets/images";

type Props = {
  page: 1 | 2 | 3
};

export default function ImagePanel({ page }: Props) {

  return (
    <CharacterFrame height={260} backgroundUrl={ui("library.png")}>
      <div className="relative w-full h-full flex items-end justify-center">
        {page === 1 ?
          <BookImage
            className="absolute bottom-0"
          /> : 
          <AnimalImage
            className="relative"
          />
        }
      </div>
    </CharacterFrame>
  );
}