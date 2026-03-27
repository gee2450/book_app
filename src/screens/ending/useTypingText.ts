import { useEffect, useMemo, useRef, useState } from "react";

export function useTypingText(
  fullText: string,
  enabled: boolean,
  onDone?: () => void,
  interval = 72
) {
  const [typedCount, setTypedCount] = useState(0);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    if (!enabled || fullText.length === 0) return;

    const timer = window.setInterval(() => {
      setTypedCount((prev) => {
        const next = prev + 1;

        if (next >= fullText.length) {
          window.clearInterval(timer);

          if (!doneRef.current) {
            doneRef.current = true;
            onDoneRef.current?.();
          }

          return fullText.length;
        }

        return next;
      });
    }, interval);

    return () => window.clearInterval(timer);
  }, [enabled, fullText, interval]);

  const displayText = useMemo(() => {
    if (!enabled) return "";
    return fullText.slice(0, typedCount);
  }, [enabled, fullText, typedCount]);

  return { displayText };
}