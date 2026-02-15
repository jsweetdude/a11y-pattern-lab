"use client";

import * as React from "react";
import { createPortal } from "react-dom";

export function ChannelGuideGridDemo() {
  return (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <ChannelGuideGrid ariaLabel="Channel guide" />
    </div>
  );
}

export function ChannelGuideGrid({ ariaLabel = "Channel guide" }) {
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

  // Selected row = currently playing channel
  const [selectedRow, setSelectedRow] = React.useState(1);

  // Roving focus position (row, col)
  // col 0 = channel buttons column, col 1 = Now, col 2.. = future
  const [pos, setPos] = React.useState({ row: selectedRow, col: 1 });

  // Last-focused cell for Tab out/in restoration
  const lastPosRef = React.useRef({ row: selectedRow, col: 1 });

  // Button refs keyed by "r-c"
  const btnRefs = React.useRef({}); // { "1-2": HTMLButtonElement }

  // Details modal
  const [dialog, setDialog] = React.useState(null);
  const openerRef = React.useRef(null);

  const totalCols = columns.length + 1; // +1 channel column
  const rowCount = channels.length + 1; // +1 header row

  function keyOf(row, col) {
    return `${row}-${col}`;
  }

  function setBtnRef(row, col, el) {
    if (!el) return;
    btnRefs.current[keyOf(row, col)] = el;
  }

  function focusButton(row, col) {
    const el = btnRefs.current[keyOf(row, col)];
    if (el && typeof el.focus === "function") el.focus();
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function commitPos(next) {
    lastPosRef.current = next;
    setPos(next);
    requestAnimationFrame(() => focusButton(next.row, next.col));
  }

  function move(deltaRow, deltaCol) {
    const nextRow = clamp(pos.row + deltaRow, 0, channels.length - 1);
    const nextCol = clamp(pos.col + deltaCol, 0, columns.length); // 0..5
    commitPos({ row: nextRow, col: nextCol });
  }

  function onGridFocusCapture(e) {
    // Only when entering grid from outside
    const from = e.relatedTarget;
    if (from && e.currentTarget.contains(from)) return;

    const last = lastPosRef.current;
    setPos(last);
    requestAnimationFrame(() => focusButton(last.row, last.col));
  }

  function onButtonFocus(row, col) {
    const next = { row, col };
    lastPosRef.current = next;
    setPos(next);
  }

  function onButtonPointerDown(row, col) {
    // Ensure roving state updates before click/focus so outline appears immediately
    const next = { row, col };
    lastPosRef.current = next;
    setPos(next);
  }

  function openDetails(payload) {
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setDialog(payload);
  }

  function closeDetails() {
    setDialog(null);
    const opener = openerRef.current;
    openerRef.current = null;

    requestAnimationFrame(() => {
      if (opener && opener.isConnected && typeof opener.focus === "function") {
        opener.focus();
      } else {
        const last = lastPosRef.current;
        focusButton(last.row, last.col);
      }
    });
  }

  function activate(row, col) {
    const channel = channels[row];

    if (col === 0) {
      openDetails({
        title: `Channel details: ${channel.name}`,
        body: `Placeholder details view for ${channel.name}.`,
      });
      return;
    }

    if (col === 1) {
      // Now: tune (no-op if already selected)
      if (row !== selectedRow) setSelectedRow(row);
      return;
    }

    const program = channel.programs[col - 1];
    openDetails({
      title: "Program details",
      body: `${channel.name} — ${program.title}. ${program.meta}. ${program.timeText}`,
    });
  }

  function onButtonKeyDown(e) {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        move(0, -1);
        break;
      case "ArrowRight":
        e.preventDefault();
        move(0, 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        move(-1, 0);
        break;
      case "ArrowDown":
        e.preventDefault();
        move(1, 0);
        break;
      case "Home":
        e.preventDefault();
        commitPos({ row: pos.row, col: 0 });
        break;
      case "End":
        e.preventDefault();
        commitPos({ row: pos.row, col: columns.length });
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        activate(pos.row, pos.col);
        break;
      default:
        break;
    }
  }

  const selectedChannel = channels[selectedRow] ?? channels[0];
  const selectedProgram = selectedChannel?.programs?.[0];

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <section
        aria-label="TV player preview"
        aria-live="polite"
        style={{
          borderRadius: 12,
          padding: 16,
          color: "#f7fafc",
          background:
            "linear-gradient(135deg, rgba(16,24,40,0.98) 0%, rgba(30,41,59,0.98) 100%)",
          border: "1px solid rgba(148,163,184,0.35)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <p style={{ margin: 0, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.85 }}>
          Live TV (Demo)
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 22, fontWeight: 700 }}>
          {selectedProgram?.title ?? "No program selected"}
        </p>
        <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.9 }}>
          {selectedChannel ? `Channel: ${selectedChannel.name}` : "Channel unavailable"}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 13, opacity: 0.75 }}>
          {selectedProgram ? `${selectedProgram.meta} • ${selectedProgram.timeText}` : ""}
        </p>
      </section>

      <button type="button" style={linkButtonStyle}>
        Focusable element before grid
      </button>

      <div
        role="grid"
        aria-label={ariaLabel}
        aria-rowcount={rowCount}
        aria-colcount={totalCols}
        onFocusCapture={onGridFocusCapture}
        style={{
          border: "1px solid rgba(0,0,0,0.2)",
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        {/* Header row (static, not focusable) */}
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
          const isSelected = rowIndex === selectedRow;

          return (
            <div
              key={ch.id}
              role="row"
              aria-selected={isSelected ? "true" : undefined}
              style={rowStyle(false, isSelected)}
            >
              {/* Rowheader cell */}
              <div role="rowheader" style={cellContainerStyle(isSelected)}>
                <button
                  type="button"
                  tabIndex={pos.row === rowIndex && pos.col === 0 ? 0 : -1}
                  ref={(el) => setBtnRef(rowIndex, 0, el)}
                  onPointerDown={() => onButtonPointerDown(rowIndex, 0)}
                  onFocus={() => onButtonFocus(rowIndex, 0)}
                  onKeyDown={onButtonKeyDown}
                  onClick={() => activate(rowIndex, 0)}
                  aria-label={`${ch.name}${isSelected ? ", currently playing" : ""}`}
                  style={cellButtonStyle}
                >
                  <span style={{ fontWeight: 650 }}>{ch.name}</span>
                </button>
              </div>

              {/* Program cells */}
              {ch.programs.map((p, programIndex) => {
                const colIndex = programIndex + 1; // 1..5
                const isNow = colIndex === 1;

                const label = isNow
                  ? `Now: ${p.title}. ${p.meta}. ${p.timeText}`
                  : `${columns[colIndex - 1].label}: ${p.title}. ${p.meta}. ${p.timeText}`;

                return (
                  <div
                    key={`${ch.id}-${p.id}`}
                    role="gridcell"
                    style={cellContainerStyle(isSelected, isNow)}
                  >
                    <button
                      type="button"
                      tabIndex={pos.row === rowIndex && pos.col === colIndex ? 0 : -1}
                      ref={(el) => setBtnRef(rowIndex, colIndex, el)}
                      onPointerDown={() => onButtonPointerDown(rowIndex, colIndex)}
                      onFocus={() => onButtonFocus(rowIndex, colIndex)}
                      onKeyDown={onButtonKeyDown}
                      onClick={() => activate(rowIndex, colIndex)}
                      aria-label={label}
                      style={cellButtonStyle}
                    >
                      {/* Visible content is fine. If VO still doubles here, wrap this in aria-hidden and keep aria-label. */}
                      <div style={{ fontWeight: 650, lineHeight: 1.2 }}>{p.title}</div>
                      <div style={{ opacity: 0.8, fontSize: 13 }}>{p.meta}</div>
                      <div style={{ opacity: 0.8, fontSize: 13 }}>{p.timeText}</div>
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <button type="button" style={linkButtonStyle}>
        Focusable element after grid
      </button>

      {dialog ? (
        <ModalDialog open={true} title={dialog.title} description={dialog.body} onClose={closeDetails}>
          <button type="button" onClick={closeDetails}>
            Close
          </button>
        </ModalDialog>
      ) : null}
    </div>
  );
}

/* Minimal modal for demo (use dialog.modal pattern in real use) */
function ModalDialog({ open, title, description, onClose, children }) {
  const titleId = React.useId();
  const descId = React.useId();
  const dialogRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
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
            <span aria-hidden="true" style={{ fontSize: 18 }}>
              ×
            </span>
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

function cellContainerStyle(isSelectedRow, isNow) {
  return {
    borderRight: "1px solid rgba(0,0,0,0.1)",
    background: isNow ? "rgba(0,0,0,0.06)" : isSelectedRow ? "rgba(0,0,0,0.03)" : "transparent",
  };
}

const cellButtonStyle = {
  width: "100%",
  height: "100%",
  minHeight: "100%",
  boxSizing: "border-box",
  display: "grid",
  gap: 2,
  padding: 10,
  textAlign: "left",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  borderRadius: 0,
  outlineOffset: 2,
};

const linkButtonStyle = {
  border: "none",
  padding: 0,
  margin: 0,
  background: "transparent",
  color: "#1d4ed8",
  textDecoration: "underline",
  font: "inherit",
  cursor: "pointer",
  justifySelf: "start",
  width: "auto",
};

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
