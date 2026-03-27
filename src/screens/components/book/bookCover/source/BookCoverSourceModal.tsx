import { motion } from "framer-motion";

type Props = {
  open: boolean;
  hasImage?: boolean;
  onClose: () => void;
  onSelectFile: (file: File) => void;
  onRemoveImage?: () => void;
};

export default function BookCoverSourceModal({
  open,
  hasImage = false,
  onClose,
  onSelectFile,
  onRemoveImage,
}: Props) {
  if (!open) return null;

  const openPicker = (useCamera: boolean) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    if (useCamera) {
      input.setAttribute("capture", "environment");
    }

    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return;
      onSelectFile(file);
    };

    input.click();
  };

  return (
    <>
      {/* 오버레이 - 페이드인 */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/45"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* 바텀시트 버튼 영역 - 슬라이드업 */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4"
        initial={{ y: 500 }}
        animate={{ y: 0 }}
        exit={{ y: 500 }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
        }}
      >
        <div className="mx-auto w-full max-w-md overflow-hidden rounded-t-3xl rounded-b-2xl border border-[#C9ACA1] bg-[#F4E3DB] shadow-xl">
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-[#C9ACA1]" />
          </div>

          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={() => openPicker(true)}
              className="flex w-full items-center justify-center border-b border-[#D8B8AC] py-4 text-lg font-semibold text-[#4C342E]"
            >
              사진 찍기
            </button>

            <button
              type="button"
              onClick={() => openPicker(false)}
              className="flex w-full items-center justify-center border-b border-[#D8B8AC] py-4 text-lg font-semibold text-[#4C342E]"
            >
              갤러리에서 선택
            </button>

            {hasImage && (
              <button
                type="button"
                onClick={onRemoveImage}
                className="flex w-full items-center justify-center border-b border-[#D8B8AC] py-4 text-lg font-semibold text-red-500"
              >
                사진 제거
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center py-4 text-lg font-semibold text-[#7A5A50]"
            >
              취소
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}