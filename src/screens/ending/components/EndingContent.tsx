import { AnimatePresence } from "framer-motion";
import { EndingActionModal, EndingResultBox } from ".";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  src: string;
  showImage: boolean;
  showResultBox: boolean;
  resultText: string;
  onResultDone?: () => void;
};

export default function EndingContent({
  src,
  showImage,
  showResultBox,
  resultText,
  onResultDone,
}: Props) {
  const [showActionModal, setShowActionModal] = useState(false);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  // 이미지의 실제 렌더링 너비를 측정하고 창 크기 변경 대응
  useEffect(() => {
    const updateWidth = () => {
      if (imgRef.current) {
        setImageWidth(imgRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [showImage]);
  
  const handleRestart = () => {
    navigate("/prologue");
  };

  const handleShowActionModal = () => {
    setShowActionModal(true);
  };

  const handleCloseActionModal = () => {
    setShowActionModal(false);
  };
  
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="relative inline-block" onClick={handleShowActionModal}>
        <img
          ref={imgRef}
          src={src}
          alt=""
          className={[
            "block w-auto h-auto max-w-screen max-h-screen object-contain transition-opacity duration-1000",
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

      <AnimatePresence>
        {showActionModal && (
          <EndingActionModal
            key="action-modal"
            onRestart={handleRestart}
            onClose={handleCloseActionModal}
            style={{ maxWidth: imageWidth ? `${imageWidth}px` : "100%" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}