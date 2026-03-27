import { useEffect, useMemo } from "react";

export function useObjectUrl(file?: Blob | null) {
  const url = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    if (!url) return;

    return () => {
      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 0);
    };
  }, [url]);

  return url;
}