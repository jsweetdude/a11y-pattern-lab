"use client";

import * as React from "react";

const ToastContext = React.createContext(null);

export function ToastProvider({ children }) {
  const [message, setMessage] = React.useState("");

  const timeoutRef = React.useRef(null);

  function clearToast() {
    setMessage("");
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function showToast(text) {
    // Replace any existing toast.
    clearToast();
    setMessage(text);

    // Auto-dismiss and clear live region text.
    timeoutRef.current = window.setTimeout(() => {
      setMessage("");
      timeoutRef.current = null;
    }, 5000);
  }

  // Ensure timeout is cleaned up if provider unmounts.
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}

      {/* Live region must exist at load and remain mounted. */}
      <div
        role="status"
        aria-atomic="true"
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 1000,
          width: "min(22rem, calc(100vw - 2rem))",
          pointerEvents: "none",
        }}
      >
        {message ? (
          <div
            style={{
              background: "#1f2937",
              color: "#ffffff",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              fontSize: "0.95rem",
              lineHeight: 1.4,
            }}
          >
            {message}
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/** Demo */
export function ToastDemo() {
  return (
    <ToastProvider>
      <ToastDemoContent />
    </ToastProvider>
  );
}

function ToastDemoContent() {
  const toast = useToast();

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
      <button type="button" onClick={() => toast("Saved successfully.")}>
        Save
      </button>

      <button type="button" onClick={() => toast("Added to watchlist.")}>
        Add to watchlist
      </button>
    </div>
  );
}