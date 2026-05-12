import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type HintBoxProps = {
  className?: string;
};

function HintBox({ className }: HintBoxProps) {
  return (
    <div className="w-full px-3">
      <NineSliceBox
        frameUrl={ui("hintbox.png")}
        slice="200 150 200 150"
        borderWidth="10px"
        imageWidth="35px 30px 35px 30px"
        fill
        className={[
          "w-full h-13",
          "flex items-center justify-center",
          "text-center",
          "px-4",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        어떤 이야기를 먹일까요?
      </NineSliceBox>
    </div>
  );
}

export default HintBox;
