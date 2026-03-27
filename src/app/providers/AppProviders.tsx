import { useEffect, useState } from "react";

import { initDb } from "@/shared/infra/db/initDb";

type Props = {
  children: React.ReactNode;
};


export default function AppProviders({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await initDb();
      } catch (e) {
        console.error("initDb failed", e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8EAD8]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#D4A574] border-t-[#8B6F47]"></div>
          <p className="text-sm text-[#8B6F47]">로딩 중...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}