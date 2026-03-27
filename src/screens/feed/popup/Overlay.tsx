import { type PropsWithChildren, useEffect } from "react";

type PopupOverlayProps = PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  closeOnDimClick?: boolean;
  lockScroll?: boolean;
  zIndex?: number;
}>;

export default function PopupOverlay({
  open,
  onClose,
  children,
  closeOnDimClick = true,
  lockScroll = true,
  zIndex = 1000,
}: PopupOverlayProps) {
  // 배경 스크롤 잠금
  useEffect(() => {
    if (!open || !lockScroll) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, lockScroll]);

  // ESC로 닫기
  useEffect(() => {
    if (!open || !onClose) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-4 py-4 bg-black/35"
      style={{ zIndex }}
      onClick={() => {
        if (closeOnDimClick) onClose?.();
      }}
    >
      <div
        className="w-full max-w-105"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
