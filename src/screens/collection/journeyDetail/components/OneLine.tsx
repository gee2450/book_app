import type { FC } from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const OneLine: FC<Props> = ({ children, onClick }) => {
  return (
    <NineSliceBox
      frameUrl={ui('small_box.png')}
      slice="90 60 60 110"
      borderWidth="12px 20px 12px 20px"
      imageWidth="50px 30px 40px 60px"
      fill
      outset="0px"
      className="w-full flex gap-2 cursor-pointer select-none"
      onClick={onClick}
      style={{ imageRendering: "pixelated" }}
    >
      {children}
    </NineSliceBox>
  );
};

export default OneLine;
