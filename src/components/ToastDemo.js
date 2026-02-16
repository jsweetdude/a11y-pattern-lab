"use client";

import { useEffect, useState } from "react";

export function ToastDemo() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setIsVisible(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [isVisible]);

  return (
    <section aria-label="Toast demo">
      <button type="button" onClick={() => setIsVisible(true)}>
        Show toast
      </button>

      {isVisible ? (
        <div className="toast" role="status" aria-live="polite">
          <p>Pattern saved. This toast auto-dismisses after 5 seconds.</p>
          <button type="button" onClick={() => setIsVisible(false)}>
            Dismiss
          </button>
        </div>
      ) : null}
    </section>
  );
}