"use client";

import * as React from "react";

export function AccordionDemo() {
  // Single-expand: exactly one panel open at a time.
  const [openId, setOpenId] = React.useState("overview");

  function toggle(id) {
    setOpenId(id);
  }

  const overviewOpen = openId === "overview";
  const detailsOpen = openId === "details";
  const shippingOpen = openId === "shipping";

  return (
    <div className="accordion-demo">
      <div className="accordion-item">
        <h3 className="accordion-heading">
          <button
            className="accordion-trigger"
            id="acc-btn-overview"
            type="button"
            aria-expanded={overviewOpen ? "true" : "false"}
            aria-controls="acc-panel-overview"
            onClick={() => toggle("overview")}
          >
            <span>Overview</span>
            <span className="accordion-icon" aria-hidden="true">
              {overviewOpen ? "−" : "+"}
            </span>
          </button>
        </h3>
        <div
          className="accordion-panel"
          id="acc-panel-overview"
          hidden={!overviewOpen}
          role="region"
          aria-labelledby="acc-btn-overview"
        >
          <p>
            This section contains summary information. Learn more in the{" "}
            <a href="#details">details section</a>.
          </p>
        </div>
      </div>

      <div className="accordion-item">
        <h3 className="accordion-heading">
          <button
            className="accordion-trigger"
            id="acc-btn-details"
            type="button"
            aria-expanded={detailsOpen ? "true" : "false"}
            aria-controls="acc-panel-details"
            onClick={() => toggle("details")}
          >
            <span>Details</span>
            <span className="accordion-icon" aria-hidden="true">
              {detailsOpen ? "−" : "+"}
            </span>
          </button>
        </h3>
        <div
          className="accordion-panel"
          id="acc-panel-details"
          hidden={!detailsOpen}
          role="region"
          aria-labelledby="acc-btn-details"
        >
          <p>
            This panel includes supporting text and a link to{" "}
            <a href="#policies">policies</a>.
          </p>
        </div>
      </div>

      <div className="accordion-item">
        <h3 className="accordion-heading">
          <button
            className="accordion-trigger"
            id="acc-btn-shipping"
            type="button"
            aria-expanded={shippingOpen ? "true" : "false"}
            aria-controls="acc-panel-shipping"
            onClick={() => toggle("shipping")}
          >
            <span>Shipping</span>
            <span className="accordion-icon" aria-hidden="true">
              {shippingOpen ? "−" : "+"}
            </span>
          </button>
        </h3>
        <div
          className="accordion-panel"
          id="acc-panel-shipping"
          hidden={!shippingOpen}
          role="region"
          aria-labelledby="acc-btn-shipping"
        >
          <p>Shipping information goes here. This panel contains only text.</p>
        </div>
      </div>
    </div>
  );
}