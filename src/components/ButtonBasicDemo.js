import * as React from "react";
import { Download, Settings } from "lucide-react";

export function ButtonBasic({
  children,
  onClick,
  disabled = false,
  ariaLabel,
  leadingIcon,
  trailingIcon,
  style,
  ...rest
}) {
  const isIconOnly = children == null || (typeof children === "string" && children.trim() === "");

  if (isIconOnly && !ariaLabel) {
    // Keep this guard minimal and explicit: icon-only buttons must be labeled.
    throw new Error("ButtonBasic: icon-only buttons require ariaLabel.");
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={isIconOnly ? ariaLabel : undefined}
      style={{ ...baseButtonStyle, ...style }}
      {...rest}
    >
      {leadingIcon ? <span aria-hidden="true" style={iconWrapStyle}>{leadingIcon}</span> : null}
      {children ? <span style={labelStyle}>{children}</span> : null}
      {trailingIcon ? <span aria-hidden="true" style={iconWrapStyle}>{trailingIcon}</span> : null}
    </button>
  );
}

/** Demo: text-only, icon+text, icon-only */
export function ButtonBasicDemo() {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }}>
      <ButtonBasic onClick={() => alert("Saved")}>Save</ButtonBasic>

      <ButtonBasic
        onClick={() => alert("Downloaded")}
        leadingIcon={<Download size={18} aria-hidden="true" focusable="false" />}
      >
        Download
      </ButtonBasic>

      <ButtonBasic
        onClick={() => alert("Settings")}
        ariaLabel="Open settings"
        leadingIcon={<Settings size={18} aria-hidden="true" focusable="false" />}
        style={{ paddingInline: 12 }}
      />
      
      <ButtonBasic disabled onClick={() => alert("Won't fire")}>
        Disabled
      </ButtonBasic>
    </div>
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

const labelStyle = {
  display: "inline-block",
};