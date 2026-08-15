import { useEffect, useId, useRef } from "react";

type ConfirmDialogProps = {
  message: string;
  testId: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({ message, testId, onCancel, onConfirm }: ConfirmDialogProps) {
  const messageId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancelRef.current();
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
        role="alertdialog"
        aria-modal="true"
        aria-describedby={messageId}
        data-testid={testId}
      >
        <div className="app-dialog-body mt-0">
          <p id={messageId} className="text-sm">
            {message}
          </p>
        </div>
        <div className="app-dialog-actions">
          <button
            type="button"
            className="btn-secondary px-3 py-2 text-sm"
            onClick={onCancel}
            data-testid={`${testId}-cancel`}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger px-3 py-2 text-sm"
            onClick={onConfirm}
            data-testid={`${testId}-confirm`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
