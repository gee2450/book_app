import { EndingResultBox } from ".";

type Props = {
  src: string;
  showImage: boolean;
  showResultBox: boolean;
  resultText: string;
  onResultDone?: () => void;
  showButtons: boolean;
};

export default function EndingContent({
  src,
  showImage,
  showResultBox,
  resultText,
  onResultDone,
}: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="relative inline-block">
        <img
          src={src}
          alt=""
          className={[
            "block w-auto h-auto max-w-[100vw] max-h-screen object-contain transition-opacity duration-1000",
            showImage ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        {showResultBox && (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-4 sm:p-6">
            <EndingResultBox
              key={`${showResultBox}-${resultText}`}
              text={resultText}
              onDone={onResultDone}
            />
          </div>
        )}
      </div>
    </div>
  );
}