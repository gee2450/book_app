import type { FC } from "react";
import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";


type Props = {
  index: number;
};

const TravelTag: FC<Props> = ({ index }) => {
  return (
    <NineSliceBox
      frameUrl={ui('travel_tag.png')}
      slice="50 20 50 100"
      borderWidth="5px 15px 5px 20px"
      imageWidth="5px 3px 5px 20px"
      fill
      className="absolute -right-5 inline-flex items-center"
      style={{ imageRendering: "pixelated" }}
    >
      <div className="text-xs whitespace-nowrap">
        여행 {index + 1}
      </div>
    </NineSliceBox>
  );
};

export default TravelTag;
