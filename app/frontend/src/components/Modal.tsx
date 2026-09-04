import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

type ModalProps = {
  title: string;
  testId: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, testId, children, onClose }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const firstControl = panelRef.current?.querySelector<HTMLElement>(
      "input:not([disabled]), button:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href]"
    );
    firstControl?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <div
      className="app-overlay fixed inset-0 flex items-center justify-center p-4"
      data-testid={`${testId}-overlay`}
    >
      <div
        ref={panelRef}
        className="app-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-testid={testId}
      >
        <div className="app-dialog-header">
          <h2 id={titleId} className="app-dialog-title">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary px-3 py-2 text-sm"
            data-testid={`${testId}-close`}
          >
            Close
          </button>
        </div>
        <div className="app-dialog-body">{children}</div>
      </div>
    </div>
  );
}
