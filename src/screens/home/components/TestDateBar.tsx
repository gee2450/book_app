type Props = {
  label: string;
  onNextDay: () => void | Promise<void>;
  onTestGrowth?: () => void;
  onTestAddFeedCnt?: () => void | Promise<void>;
};

export default function TestDateBar({ label, onNextDay, onTestGrowth, onTestAddFeedCnt }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
      <span className="rounded border px-2 py-1">
        테스트 날짜: {label}
      </span>

      <button
        type="button"
        onClick={onNextDay}
        className="rounded border px-2 py-1"
      >
        +1일
      </button>

      {onTestAddFeedCnt && (
        <button
          type="button"
          onClick={onTestAddFeedCnt}
          className="rounded border px-2 py-1 bg-blue-200/50"
        >
          +10 먹이
        </button>
      )}

      {onTestGrowth && (
        <button
          type="button"
          onClick={onTestGrowth}
          className="rounded border px-2 py-1 bg-green-200/50"
        >
          🎆 Growth
        </button>
      )}
    </div>
  );
}