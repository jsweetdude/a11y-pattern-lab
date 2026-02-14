"use client";

import * as React from "react";

export function CollectionRow({
  heading = "Customers Also Viewed",
  items = DEFAULT_ITEMS,
  pageSize = 6,
}) {
  const headingId = React.useId();

  const [startIndex, setStartIndex] = React.useState(0);

  // Refs to manage focus when paging.
  const itemLinkRefs = React.useRef([]);
  const nextButtonRef = React.useRef(null);
  const prevButtonRef = React.useRef(null);

  const total = items.length;

  const endIndex = Math.min(startIndex + pageSize, total);
  const visibleItems = items.slice(startIndex, endIndex);

  const canGoPrev = startIndex > 0;
  const canGoNext = endIndex < total;

  function focusFirstVisibleItem() {
    const first = itemLinkRefs.current[0];
    if (first && typeof first.focus === "function") first.focus();
  }

  function focusLastVisibleItem() {
    const last = itemLinkRefs.current[visibleItems.length - 1];
    if (last && typeof last.focus === "function") last.focus();
  }

  function goNext() {
    const nextStart = Math.min(startIndex + pageSize, Math.max(total - pageSize, 0));
    if (nextStart === startIndex) return;

    setStartIndex(nextStart);

    // Focus after the DOM updates.
    requestAnimationFrame(() => {
      focusFirstVisibleItem();
    });
  }

  function goPrev() {
    const prevStart = Math.max(startIndex - pageSize, 0);
    if (prevStart === startIndex) return;

    setStartIndex(prevStart);

    requestAnimationFrame(() => {
      focusLastVisibleItem();
    });
  }

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      style={{
        position: "relative",
        padding: "12px 48px",
        background: "#fff",
        color: "#111",
        borderRadius: 12,
        maxWidth: 1100,
      }}
    >
      <h2 id={headingId} style={{ marginTop: 0, marginBottom: 12, fontSize: 20 }}>
        {heading}
      </h2>

      {canGoPrev ? (
        <button
          ref={prevButtonRef}
          type="button"
          onClick={goPrev}
          aria-label="Previous items"
          style={edgeButtonStyle("left")}
        >
          ‹
        </button>
      ) : null}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gridTemplateColumns: `repeat(${pageSize}, minmax(0, 1fr))`,
          gap: 12,
        }}
      >
        {visibleItems.map((item, localIndex) => {
          const globalIndex = startIndex + localIndex;
          const titleId = `cr-title-${headingId}-${globalIndex}`;
          const posId = `cr-pos-${headingId}-${globalIndex}`;
          const metaId = `cr-meta-${headingId}-${globalIndex}`;

          return (
            <li key={item.id}>
              <a
                href={item.href}
                ref={(el) => {
                  itemLinkRefs.current[localIndex] = el;
                }}
                aria-labelledby={`${titleId} ${metaId}`}
                aria-describedby={posId}
                style={{
                  display: "grid",
                  gap: 8,
                  textDecoration: "none",
                  color: "inherit",
                  borderRadius: 12,
                  padding: 10,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 10,
                    background: "rgba(0,0,0,0.06)",
                    backgroundImage: item.image ? `url(${item.image})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div style={{ display: "grid", gap: 4 }}>
                  <div
                    id={titleId}
                    style={{
                      fontWeight: 650,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}{" "}
                  </div>
                    <span id={posId} style={srOnlyStyle}>
                      {globalIndex + 1} of {total}
                    </span>

                  <div id={metaId} style={{ color: "rgba(0,0,0,0.75)" }}>
                    {item.meta}
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      {canGoNext ? (
        <button
          ref={nextButtonRef}
          type="button"
          onClick={goNext}
          aria-label="Next items"
          style={edgeButtonStyle("right")}
        >
          ›
        </button>
      ) : null}
    </div>
  );
}

function edgeButtonStyle(side) {
  return {
    position: "absolute",
    top: "50%",
    transform: "translateY(-35%)",
    [side]: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "#fff",
    color: "#111",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    fontSize: 26,
    lineHeight: 1,
  };
}

const srOnlyStyle = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
};

const DEFAULT_ITEMS = [
  {
    id: "wb-1",
    title: "Superflo Water Bottle",
    meta: "$24.95",
    href: "#",
    image: "https://picsum.photos/seed/bottle-1/400/400",
  },
  {
    id: "wb-2",
    title: "HydraSip Insulated Flask",
    meta: "$29.00",
    href: "#",
    image: "https://picsum.photos/seed/bottle-2/400/400",
  },
  {
    id: "wb-3",
    title: "AquaGnome Travel Mug",
    meta: "$18.50",
    href: "#",
    image: "https://picsum.photos/seed/bottle-3/400/400",
  },
  {
    id: "wb-4",
    title: "Nimbus Steel Tumbler",
    meta: "$22.00",
    href: "#",
    image: "https://picsum.photos/seed/bottle-4/400/400",
  },
  {
    id: "wb-5",
    title: "GlacierFlip Lid Bottle",
    meta: "$27.99",
    href: "#",
    image: "https://picsum.photos/seed/bottle-5/400/400",
  },
  {
    id: "wb-6",
    title: "Sprout & Sip Kids Bottle",
    meta: "$16.95",
    href: "#",
    image: "https://picsum.photos/seed/bottle-6/400/400",
  },
  {
    id: "wb-7",
    title: "Orbit Wide-Mouth Bottle",
    meta: "$25.50",
    href: "#",
    image: "https://picsum.photos/seed/bottle-7/400/400",
  },
  {
    id: "wb-8",
    title: "TrailMate Bottle Sling Set",
    meta: "$34.00",
    href: "#",
    image: "https://picsum.photos/seed/bottle-8/400/400",
  },
  {
    id: "wb-9",
    title: "ColdBrew Bottle Kit",
    meta: "$31.25",
    href: "#",
    image: "https://picsum.photos/seed/bottle-9/400/400",
  },
  {
    id: "wb-10",
    title: "PeakFlow Filter Bottle",
    meta: "$39.95",
    href: "#",
    image: "https://picsum.photos/seed/bottle-10/400/400",
  },
  {
    id: "wb-11",
    title: "Minimalist Glass Bottle",
    meta: "$19.95",
    href: "#",
    image: "https://picsum.photos/seed/bottle-11/400/400",
  },
  {
    id: "wb-12",
    title: "Commuter Grip Bottle",
    meta: "$21.00",
    href: "#",
    image: "https://picsum.photos/seed/bottle-12/400/400",
  },
  {
    id: "wb-13",
    title: "Summit Straw Bottle",
    meta: "$26.40",
    href: "#",
    image: "https://picsum.photos/seed/bottle-13/400/400",
  },
  {
    id: "wb-14",
    title: "Metro Leakproof Flask",
    meta: "$28.10",
    href: "#",
    image: "https://picsum.photos/seed/bottle-14/400/400",
  },
  {
    id: "wb-15",
    title: "RidgeRunner Sport Bottle",
    meta: "$23.75",
    href: "#",
    image: "https://picsum.photos/seed/bottle-15/400/400",
  },
  {
    id: "wb-16",
    title: "EcoPress Glass Tumbler",
    meta: "$20.50",
    href: "#",
    image: "https://picsum.photos/seed/bottle-16/400/400",
  },
  {
    id: "wb-17",
    title: "ArcticLock Thermal Bottle",
    meta: "$33.20",
    href: "#",
    image: "https://picsum.photos/seed/bottle-17/400/400",
  },
  {
    id: "wb-18",
    title: "Voyager Daily Hydration Kit",
    meta: "$36.00",
    href: "#",
    image: "https://picsum.photos/seed/bottle-18/400/400",
  },
];