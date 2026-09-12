import { AnimatePresence, motion } from "framer-motion";

type Props = {
  open: boolean;
  label: string;
  onClose: () => void;
  onNextDay: () => void | Promise<void>;
  onTestGrowth?: () => void;
  onTestAddFeedCnt?: () => void | Promise<void>;
};

export default function DevModeModal({
  open,
  label,
  onClose,
  onNextDay,
  onTestGrowth,
  onTestAddFeedCnt,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 오버레이 */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/45"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* 바텀시트 */}
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
            <div className="mx-auto w-full overflow-hidden rounded-t-3xl rounded-b-2xl border border-[#C9ACA1] bg-[#F4E3DB] shadow-xl">
              {/* 핸들 */}
              <div className="flex justify-center py-3">
                <div className="h-1.5 w-12 rounded-full bg-[#C9ACA1]" />
              </div>

              <div className="px-5 pb-5">
                {/* 제목 */}
                <div className="pb-3 text-center">
                  <p className="text-lg font-bold tracking-wide text-[#4C342E]">
                    ✦ DEV MODE ✦
                  </p>

                  <p className="mt-1 text-sm text-[#7A5A50]">
                    테스트 날짜 · {label}
                  </p>
                </div>

                {/* 다음 날 */}
                <button
                  type="button"
                  onClick={onNextDay}
                  className="
                    flex w-full items-center justify-center
                    border-t border-b border-[#D8B8AC]
                    py-4
                    text-lg font-semibold text-[#4C342E]
                    transition-colors
                    hover:bg-[#EEDDD4]
                    active:bg-[#E5D1C8]
                  "
                >
                  다음 날로 이동
                </button>

                {/* 먹이 10회 */}
                {onTestAddFeedCnt && (
                  <button
                    type="button"
                    onClick={onTestAddFeedCnt}
                    className="
                      flex w-full items-center justify-center
                      border-b border-[#D8B8AC]
                      py-4
                      text-lg font-semibold text-[#4C342E]
                      transition-colors
                      hover:bg-[#EEDDD4]
                      active:bg-[#E5D1C8]
                    "
                  >
                    먹이 10번 주기
                  </button>
                )}

                {/* 성장 미리보기 */}
                {onTestGrowth && (
                  <button
                    type="button"
                    onClick={onTestGrowth}
                    className="
                      flex w-full items-center justify-center
                      border-b border-[#D8B8AC]
                      py-4
                      text-lg font-semibold text-[#4C342E]
                      transition-colors
                      hover:bg-[#EEDDD4]
                      active:bg-[#E5D1C8]
                    "
                  >
                    ✨ 다음 성장 미리보기
                  </button>
                )}

                {/* 닫기 */}
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex w-full items-center justify-center
                    py-4
                    text-lg font-semibold text-[#7A5A50]
                    transition-colors
                    hover:text-[#4C342E]
                  "
                >
                  닫기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}