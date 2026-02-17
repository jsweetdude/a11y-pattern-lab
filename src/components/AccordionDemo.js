"use client";

import * as React from "react";

export function AccordionDemo() {
  // Demo uses: single-expand behavior (common). Multiple-expand is allowed via Customizable.
  const [openIndex, setOpenIndex] = React.useState(0);

  const items = [
    {
      title: "Overview",
      content: (
        <>
          <p>
            This section contains summary information. Learn more in the{" "}
            <a href="#details">details section</a>.
          </p>
        </>
      ),
    },
    {
      title: "Details",
      content: (
        <>
          <p>
            This panel includes supporting text and a link to{" "}
            <a href="#policies">policies</a>.
          </p>
        </>
      ),
    },
    {
      title: "Shipping",
      content: (
        <>
          <p>
            Shipping information goes here. This panel contains only text.
          </p>
        </>
      ),
    },
  ];

  return (
    <div>
      {items.map((item, i) => {
        const buttonId = `acc-btn-${i}`;
        const panelId = `acc-panel-${i}`;
        const expanded = openIndex === i;

        function onToggle() {
          // Single-expand: selecting a new header opens it and collapses the previous.
          setOpenIndex((prev) => (prev === i ? i : i));
        }

        return (
          <div key={buttonId}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded ? "true" : "false"}
                aria-controls={panelId}
                onClick={onToggle}
              >
                {item.title}
              </button>
            </h3>

            <div
              id={panelId}
              hidden={!expanded}
              role="region"
              aria-labelledby={buttonId}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}