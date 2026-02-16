import * as React from "react";

export function ToggleButtonDemo() {
  const [muted, setMuted] = React.useState(false);
  const [iconOnlyMuted, setIconOnlyMuted] = React.useState(false);
  const [pinned, setPinned] = React.useState(false);
  const [bold, setBold] = React.useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 16 }}>
      <div>
        <p style={groupLabelStyle}>Toggle state indicated by accessible name change</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Next-action labeling (no aria-pressed) */}
          <button
            type="button"
            onClick={() => setMuted((v) => !v)}
            style={baseButtonStyle}
          >
            <span aria-hidden="true" style={iconWrapStyle}>
              {muted ? <MutedIcon /> : <SoundIcon />}
            </span>
            <span>{muted ? "Unmute" : "Mute"}</span>
          </button>

          <button
            type="button"
            onClick={() => setPinned((v) => !v)}
            style={baseButtonStyle}
          >
            <span aria-hidden="true" style={iconWrapStyle}>
              {pinned ? <PinnedIcon /> : <PinIcon />}
            </span>
            <span>{pinned ? "Unpin" : "Pin"}</span>
          </button>

          {/* Icon-only, next-action labeling via aria-label */}
          <button
            type="button"
            onClick={() => setIconOnlyMuted((v) => !v)}
            aria-label={iconOnlyMuted ? "Unmute" : "Mute"}
            style={{ ...baseButtonStyle, paddingInline: 12 }}
          >
            <span aria-hidden="true" style={iconWrapStyle}>
              {iconOnlyMuted ? <MutedIcon /> : <SoundIcon />}
            </span>
          </button>
        </div>
      </div>

      <div>
        <p style={groupLabelStyle}>Toggle state indicated by `aria-pressed`</p>
        <button
          type="button"
          aria-pressed={bold ? "true" : "false"}
          onClick={() => setBold((v) => !v)}
          style={baseButtonStyle}
        >
          <span aria-hidden="true" style={iconWrapStyle}>
            <BoldIcon active={bold} />
          </span>
          <span>Bold</span>
        </button>
      </div>
    </div>
  );
}

function SoundIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" focusable="false">
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 9a4 4 0 0 1 0 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18.5 6.5a7 7 0 0 1 0 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" focusable="false">
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M16 9l5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 9l-5 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" focusable="false">
      <path
        d="M14 3 21 10 17 14v4l-2 2-4-4-6 6-1-1 6-6-4-4 2-2h4l4-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinnedIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" focusable="false">
      <path
        d="M14 3 21 10 17 14v4l-2 2-4-4-6 6-1-1 6-6-4-4 2-2h4l4-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BoldIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" focusable="false">
      <path
        d="M8 4h6a4 4 0 0 1 0 8H8V4Zm0 8h7a4 4 0 0 1 0 8H8v-8Z"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const baseButtonStyle = {
  appearance: "none",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 10,
  background: "#111",
  color: "#fff",
  padding: "10px 14px",
  fontSize: 14,
  fontWeight: 600,
  lineHeight: 1.1,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
};

const iconWrapStyle = {
  display: "inline-flex",
  alignItems: "center",
};

const groupLabelStyle = {
  margin: "0 0 8px",
  fontSize: 14,
  fontWeight: 600,
};
