import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from '@/assets/images/ui/ui';


type NamePlateProps = {
  name?: string;
};

function NamePlate({ name }: NamePlateProps) {
  return (
    <NineSliceBox
      frameUrl={ui('name.png')}
      slice="0 500"
      borderWidth="0 40px"
      imageWidth="0 60px"
      fill
      className="mt-2 inline-flex items-center justify-center font-bold text-xl"
      style={{
        minWidth: 160,
        height: 40,
      }}
    >
      {name ? name : "?"}
    </NineSliceBox>
  );
}

export default NamePlate;
