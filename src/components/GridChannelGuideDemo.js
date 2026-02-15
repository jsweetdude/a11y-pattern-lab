"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export function ChannelGuideGridDemo() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <button type="button">Focusable element before grid</button>

      <ChannelGuideGrid ariaLabel="Channel guide" />

      <button type="button">Focusable element after grid</button>
    </div>
  );
}

export function ChannelGuideGrid({ ariaLabel = "Channel guide" }) {
  const gridId = React.useId();

  // Demo data: 5 channels x 5 program columns (Now + 4 future).
  const columns = React.useMemo(
    () => [
      { key: "now", label: "Now" },
      { key: "t1", label: "4:00 PM" },
      { key: "t2", label: "4:30 PM" },
      { key: "t3", label: "5:00 PM" },
      { key: "t4", label: "5:30 PM" },
    ],
    []
  );

  const channels = React.useMemo(() => DEMO_CHANNELS, []);

  // Selected row = the channel currently playing.
  const [selectedRow, setSelectedRow] = React.useState(1);

  // Focused cell coordinates (row, col):
  // col 0 = channel rowheader column
  // col 1 = "Now"
  // col 2.. = future listings
  const [focusPos, setFocusPos] = React.useState(() => ({
    row: selectedRow,
    col: 1,
  }));

  // Persist last-focused cell so Tab out / Tab back in restores.
  const lastFocusRef = React.useRef({ row: selectedRow, col: 1 });

  // Refs for roving tabindex
  const cellRefs = React.useRef({}); // key: `${row}-${col}` -> element

  // Details dialog
  const [dialog, setDialog] = React.useState(null);

  function setCellRef(row, col, el) {
    if (!el) return;
    cellRefs.current[`${row}-${col}`] = el;
  }

  function focusCell(row, col) {
    const key = `${row}-${col}`;
    const el = cellRefs.current[key];
    if (el && typeof el.focus === "function") el.focus();
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function moveFocus(deltaRow, deltaCol) {
    const nextRow = clamp(focusPos.row + deltaRow, 0, channels.length - 1);
    const nextCol = clamp(focusPos.col + deltaCol, 0, columns.length); // +1 because channel column is 0, programs start at 1
    const next = { row: nextRow, col: nextCol };

    lastFocusRef.current = next;
    setFocusPos(next);

    // After state updates, move DOM focus
    requestAnimationFrame(() => {
      focusCell(next.row, next.col);
    });
  }

  function onGridFocusCapture() {
    // When tabbing into the grid, land on last focused cell.
    const last = lastFocusRef.current;
    setFocusPos(last);
    requestAnimationFrame(() => {
      focusCell(last.row, last.col);
    });
  }

  function onCellFocus(row, col) {
    const next = { row, col };
    lastFocusRef.current = next;
    setFocusPos(next);
  }

  function openDetails(payload) {
    setDialog(payload);
  }

  function closeDetails() {
    setDialog(null);
  }

  function activateCell(row, col) {
    const channel = channels[row];

    if (col === 0) {
      // Channel “details”
      openDetails({
        title: `Channel details: ${channel.name}`,
        body: `This is a placeholder details view for ${channel.name}.`,
      });
      return;
    }

    if (col === 1) {
      // Now: tune (no-op if already selected)
      if (row !== selectedRow) setSelectedRow(row);
      return;
    }

    // Future: program details
    const program = channel.programs[col - 1]; // programs indexed by columns (now + future)
    openDetails({
      title: `Program details`,
      body: `${channel.name} — ${program.title}. ${program.meta}. ${program.timeText}`,
    });
  }

  function onCellKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(0, -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        moveFocus(0, 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveFocus(-1, 0);
        break;
      case "ArrowDown":
        e.preventDefault();
        moveFocus(1, 0);
        break;
      case "Home":
        e.preventDefault();
        // Start of row (channel column)
        moveFocus(0, -999);
        break;
      case "End":
        e.preventDefault();
        // End of row (last time column)
        moveFocus(0, 999);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        activateCell(focusPos.row, focusPos.col);
        break;
      default:
        break;
    }
  }

  // Keep focusPos row in sync if selectedRow changes and focus was initialized from it.
  React.useEffect(() => {
    // If user tunes via click/enter on Now column, we do not forcibly move focus elsewhere.
    // Selected state is visual/semantic only.
  }, [selectedRow]);

  const totalCols = columns.length + 1; // +1 for channel column

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        role="grid"
        aria-label={ariaLabel}
        aria-rowcount={channels.length + 1}
        aria-colcount={totalCols}
        onFocusCapture={onGridFocusCapture}
        style={{
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Header row */}
        <div role="row" style={rowStyle(true)}>
          <div role="columnheader" style={headerCellStyle}>
            Channel
          </div>
          {columns.map((c) => (
            <div key={c.key} role="columnheader" style={headerCellStyle}>
              {c.label}
            </div>
          ))}
        </div>

        {/* Data rows */}
        {channels.map((ch, rowIndex) => {
          const isSelectedRow = rowIndex === selectedRow;

          return (
            <div
              key={ch.id}
              role="row"
              aria-selected={isSelectedRow ? "true" : undefined}
              style={rowStyle(false, isSelectedRow)}
            >
              {/* Channel column (rowheader) */}
              <button
                type="button"
                role="rowheader"
                aria-label={`${ch.name}${isSelectedRow ? ", currently playing" : ""}`}
                tabIndex={focusPos.row === rowIndex && focusPos.col === 0 ? 0 : -1}
                ref={(el) => setCellRef(rowIndex, 0, el)}
                onFocus={() => onCellFocus(rowIndex, 0)}
                onKeyDown={onCellKeyDown}
                onClick={() => activateCell(rowIndex, 0)}
                style={cellButtonStyle(isSelectedRow)}
              >
                <span style={{ fontWeight: 650 }}>{ch.name}</span>
              </button>

              {/* Program cells */}
              {ch.programs.map((p, programIndex) => {
                const colIndex = programIndex + 1; // program columns start at 1
                const isActive = focusPos.row === rowIndex && focusPos.col === colIndex;
                const isNowCol = colIndex === 1;

                // For SR: expose “Now” vs time label + position
                const label = isNowCol
                  ? `Now: ${p.title}. ${p.meta}. ${p.timeText}`
                  : `${columns[colIndex - 1].label}: ${p.title}. ${p.meta}. ${p.timeText}`;

                return (
                  <button
                    key={`${ch.id}-${p.id}`}
                    type="button"
                    role="gridcell"
                    aria-label={label}
                    tabIndex={isActive ? 0 : -1}
                    ref={(el) => setCellRef(rowIndex, colIndex, el)}
                    onFocus={() => onCellFocus(rowIndex, colIndex)}
                    onKeyDown={onCellKeyDown}
                    onClick={() => activateCell(rowIndex, colIndex)}
                    style={programCellStyle(isSelectedRow, isNowCol)}
                  >
                    <div style={{ fontWeight: 650, lineHeight: 1.2 }}>{p.title}</div>
                    <div style={{ opacity: 0.8, fontSize: 13 }}>{p.meta}</div>
                    <div style={{ opacity: 0.8, fontSize: 13 }}>{p.timeText}</div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {dialog ? (
        <ModalDialog
          open={true}
          title={dialog.title}
          description={dialog.body}
          onClose={closeDetails}
        >
          <button type="button" onClick={closeDetails}>
            Close
          </button>
        </ModalDialog>
      ) : null}
    </div>
  );
}

/* Minimal modal for demo (use your dialog.modal pattern in real use) */
function ModalDialog({ open, title, description, onClose, children }) {
  const titleId = React.useId();
  const descId = React.useId();
  const dialogRef = React.useRef(null);
  const openerRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!open) return;
    openerRef.current = document.activeElement;
  }, [open]);

  React.useEffect(() => {
    if (!open) {
      if (openerRef.current && openerRef.current.focus) openerRef.current.focus();
      return;
    }
    if (dialogRef.current) dialogRef.current.focus();
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: 16,
        background: "rgba(0,0,0,0.55)",
        zIndex: 999,
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
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          <div style={{ minWidth: 0 }}>
            <h2 id={titleId} style={{ margin: 0 }}>{title}</h2>
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
              borderRadius: 10,
              border: "1px solid rgba(0,0,0,0.2)",
              background: "transparent",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              flex: "0 0 auto",
              lineHeight: 1,
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 18 }}>×</span>
          </button>
        </div>

        <div style={{ marginTop: 16 }}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

/* Styles */
function rowStyle(isHeader, isSelectedRow) {
  return {
    display: "grid",
    gridTemplateColumns: "220px repeat(5, minmax(0, 1fr))",
    gap: 0,
    background: isHeader ? "rgba(0,0,0,0.06)" : "#fff",
    borderTop: isHeader ? "none" : "1px solid rgba(0,0,0,0.1)",
    outline: isSelectedRow ? "2px solid rgba(0,0,0,0.35)" : "none",
    outlineOffset: isSelectedRow ? -2 : 0,
  };
}

const headerCellStyle = {
  padding: 10,
  fontWeight: 700,
  fontSize: 13,
  borderRight: "1px solid rgba(0,0,0,0.1)",
};

function cellButtonStyle(isSelectedRow) {
  return {
    padding: 10,
    textAlign: "left",
    border: "none",
    background: isSelectedRow ? "rgba(0,0,0,0.03)" : "transparent",
    borderRight: "1px solid rgba(0,0,0,0.1)",
    cursor: "pointer",
  };
}

function programCellStyle(isSelectedRow, isNowCol) {
  return {
    padding: 10,
    textAlign: "left",
    border: "none",
    background: isNowCol ? "rgba(0,0,0,0.06)" : "transparent",
    borderRight: "1px solid rgba(0,0,0,0.1)",
    cursor: "pointer",
    outlineOffset: 2,
  };
}

/* Demo data */
const DEMO_CHANNELS = [
  {
    id: "c1",
    name: "News 24",
    programs: [
      { id: "p11", title: "Live Headlines", meta: "TV-PG · News", timeText: "22m remaining" },
      { id: "p12", title: "World Report", meta: "TV-PG · News", timeText: "4:00–4:30 PM" },
      { id: "p13", title: "City Desk", meta: "TV-PG · News", timeText: "4:30–5:00 PM" },
      { id: "p14", title: "Markets", meta: "TV-G · Business", timeText: "5:00–5:30 PM" },
      { id: "p15", title: "Evening Brief", meta: "TV-PG · News", timeText: "5:30–6:00 PM" },
    ],
  },
  {
    id: "c2",
    name: "Action Max",
    programs: [
      { id: "p21", title: "Steel Harbor", meta: "PG-13 · Action", timeText: "48m remaining" },
      { id: "p22", title: "Night Pursuit", meta: "R · Action", timeText: "4:00–4:30 PM" },
      { id: "p23", title: "Rapid Response", meta: "TV-14 · Series", timeText: "4:30–5:00 PM" },
      { id: "p24", title: "Streetline", meta: "TV-14 · Series", timeText: "5:00–5:30 PM" },
      { id: "p25", title: "Afterburn", meta: "TV-14 · Series", timeText: "5:30–6:00 PM" },
    ],
  },
  {
    id: "c3",
    name: "Comedy Loop",
    programs: [
      { id: "p31", title: "Lunch Break Laughs", meta: "TV-PG · Comedy", timeText: "10m remaining" },
      { id: "p32", title: "Stand-Up Hour", meta: "TV-MA · Comedy", timeText: "4:00–4:30 PM" },
      { id: "p33", title: "Sitcom Shuffle", meta: "TV-PG · Comedy", timeText: "4:30–5:00 PM" },
      { id: "p34", title: "Sketch Night", meta: "TV-14 · Comedy", timeText: "5:00–5:30 PM" },
      { id: "p35", title: "Late Laughs", meta: "TV-14 · Comedy", timeText: "5:30–6:00 PM" },
    ],
  },
  {
    id: "c4",
    name: "Nature HD",
    programs: [
      { id: "p41", title: "Wild Rivers", meta: "TV-G · Documentary", timeText: "35m remaining" },
      { id: "p42", title: "Deep Forest", meta: "TV-G · Documentary", timeText: "4:00–4:30 PM" },
      { id: "p43", title: "Ocean Life", meta: "TV-G · Documentary", timeText: "4:30–5:00 PM" },
      { id: "p44", title: "Sky Trails", meta: "TV-G · Documentary", timeText: "5:00–5:30 PM" },
      { id: "p45", title: "Night Creatures", meta: "TV-PG · Documentary", timeText: "5:30–6:00 PM" },
    ],
  },
  {
    id: "c5",
    name: "Kids Zone",
    programs: [
      { id: "p51", title: "Puzzle Pals", meta: "TV-Y · Kids", timeText: "7m remaining" },
      { id: "p52", title: "Craft Corner", meta: "TV-Y · Kids", timeText: "4:00–4:30 PM" },
      { id: "p53", title: "Story Time", meta: "TV-Y · Kids", timeText: "4:30–5:00 PM" },
      { id: "p54", title: "Space Sprouts", meta: "TV-Y7 · Kids", timeText: "5:00–5:30 PM" },
      { id: "p55", title: "Animal Amigos", meta: "TV-Y · Kids", timeText: "5:30–6:00 PM" },
    ],
  },
];