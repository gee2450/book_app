import { motion } from "framer-motion";

type Props = {
  onRestart: () => void;
  onClose: () => void;
};

export default function EndingActionModal({ onRestart, onClose }: Props) {
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
          {/* 드래그 핸들 */}
          <div className="flex justify-center py-3">
            <div className="h-1.5 w-12 rounded-full bg-[#C9ACA1]" />
          </div>

          {/* 버튼 영역 */}
          <div className="px-5 pb-5">
            {/* 새로운 여정 시작하기 버튼 */}
            <button
              type="button"
              onClick={onRestart}
              className="flex w-full items-center justify-center py-4 text-lg font-semibold text-[#6B4423]"
            >
              새로운 여정 시작하기
            </button>

            {/* 계속 보기 버튼 */}
            <button
              type="button"
              onClick={onClose}
              className="flex w-full items-center justify-center border-b border-[#D8B8AC] py-4 text-lg font-semibold text-[#4C342E]"
            >
              엔딩 계속 보기
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
