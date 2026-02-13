"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type ModalDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;

  /**
   * Optional. The element to mark inert while the dialog is open.
   * Recommended: pass a stable app root element (e.g., document.getElementById("app-root")).
   * If omitted and #app-root is not found, background inert will be skipped.
   */
  inertRoot?: HTMLElement | null;
};

export function ModalDialog({
  open,
  title,
  description,
  onClose,
  children,
  inertRoot,
}: ModalDialogProps) {
  const titleId = React.useId();
  const descId = React.useId();

  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  const openerRef = React.useRef<HTMLElement | null>(null);

  // Capture the opener at the moment we open (so focus can be restored on close).
  React.useLayoutEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement as HTMLElement | null;
  }, [open]);

  // Background inert while open (optional; depends on target root existing).
  React.useEffect(() => {
    const target = inertRoot ?? document.getElementById("app-root");
    if (!target) return;

    if (open) {
      target.setAttribute("inert", "");
    } else {
      target.removeAttribute("inert");
    }

    return () => {
      target.removeAttribute("inert");
    };
  }, [open, inertRoot]);

  // Focus entry (simple) + focus restore (important).
  React.useEffect(() => {
    if (!open) {
      openerRef.current?.focus?.();
      return;
    }

    // Put focus into the dialog container. No focus trap; Tab may leave page (accepted).
    dialogRef.current?.focus();
  }, [open]);

  // Close on Escape.
  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const modal = (
    <div
      role="presentation"
      onMouseDown={(e) => {
        // Click outside closes.
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: 16,
        background: "rgba(0,0,0,0.55)",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        style={{
          width: "min(560px, 100%)",
          background: "white",
          color: "black",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h2 id={titleId} style={{ margin: 0 }}>
              {title}
            </h2>
            {description ? (
              <p id={descId} style={{ marginTop: 8, marginBottom: 0 }}>
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "transparent",
              display: "inline-grid",
              placeItems: "center",
              lineHeight: 1,
              cursor: "pointer",
              flex: "0 0 auto",
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 18 }}>
              ×
            </span>
          </button>
        </div>

        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export function DialogDemo() {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputId = React.useId();
  const inertRoot = React.useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.getElementById("__next");
  }, []);

  return (
    <section aria-label="Dialog demo">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>

      <ModalDialog
        open={isOpen}
        inertRoot={inertRoot}
        title="Dialog Pattern"
        description="Focus enters on open, closes on Escape, and restores to the opener on close."
        onClose={() => setIsOpen(false)}
      >
        <label htmlFor={inputId}>Name</label>
        <input id={inputId} type="text" placeholder="Type here" />
        <div className="actions">
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
          <button type="button">Secondary action</button>
        </div>
      </ModalDialog>
    </section>
  );
}
