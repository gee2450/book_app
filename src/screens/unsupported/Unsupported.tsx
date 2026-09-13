import NineSliceBox from "@/shared/NineSliceBox";
import { ui } from "@/assets/images";

type Props = {
  widthTooSmall: boolean;
  heightTooSmall: boolean;
};

function UnsupportedScreen({
  widthTooSmall,
  heightTooSmall,
}: Props) {
  const isBothTooSmall = widthTooSmall && heightTooSmall;

  return (
    <main className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#F5DCD9]">
      {/* 종이 질감 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${ui("paper.png")})`,
          backgroundRepeat: "repeat",
          opacity: 0.35,
        }}
      />

      <NineSliceBox
        frameUrl={ui("popup.png")}
        slice="100 64 100 64"
        borderWidth="14px 20px 30px 20px"
        imageWidth="50px 32px 60px 32px"
        fill
        className="
          relative
          box-border
          w-[min(400px,calc(100vw-40px))]
          max-h-[calc(100dvh-40px)]
          overflow-hidden
          px-5
          pt-12
          pb-8
        "
      >
        {/* Header */}
        <div className="absolute left-0 top-0 w-full">
          <div className="flex h-8 items-center justify-center">
            <div className="text-[18px] font-extrabold text-[#584036]">
              화면 크기 안내
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <img
            src={ui("animals/fox/stage3/idle.gif")}
            alt=""
            className="h-24 w-24 object-contain"
            style={{ imageRendering: "pixelated" }}
          />

          <h2 className="mt-2 mb-0 text-[17px] font-extrabold text-[#584036]">
            앗, 잠깐만요!
          </h2>

          <div className="mt-3 text-[14px] font-bold leading-6 text-[#584036]">
            {isBothTooSmall ? (
              <>
                화면 크기가 조금 부족해요.
                <br />
                <span className="text-[#957361]">
                  창을 더 크게 늘려주세요.
                </span>
              </>
            ) : widthTooSmall ? (
              <>
                화면의 가로가 조금 부족해요.
                <br />
                <span className="text-[#957361]">
                  창을 조금 더 넓혀주세요.
                </span>
              </>
            ) : (
              <>
                화면의 세로가 조금 부족해요.
                <br />
                <span className="text-[#957361]">
                  창을 조금 더 길게 늘려주세요.
                </span>
              </>
            )}
          </div>

          <p className="mt-5 mb-0 text-[11px] font-semibold leading-5 text-[#957361]">
            화면 크기를 조정한 뒤
            <br />
            다시 방문해주세요!
          </p>
        </div>
      </NineSliceBox>
    </main>
  );
}

export default UnsupportedScreen;