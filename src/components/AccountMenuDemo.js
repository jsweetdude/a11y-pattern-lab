"use client";

import * as React from "react";

export function AccountMenuDemo() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const menuRef = React.useRef(null);

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    setOpen((v) => !v);
  }

  React.useEffect(() => {
    if (!open) return;

    function onPointerDown(e) {
      const btn = buttonRef.current;
      const menu = menuRef.current;
      if (!btn || !menu) return;

      const target = e.target;
      const isInside = btn.contains(target) || menu.contains(target);
      if (!isInside) closeMenu();
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    function onFocusIn(e) {
      const btn = buttonRef.current;
      const menu = menuRef.current;
      if (!btn || !menu) return;

      const target = e.target;
      const isInside = btn.contains(target) || menu.contains(target);
      if (!isInside) closeMenu();
    }

    document.addEventListener("focusin", onFocusIn, true);
    return () => document.removeEventListener("focusin", onFocusIn, true);
  }, [open]);

  return (
    <div className="account-menu-demo">
      <button
        ref={buttonRef}
        id="account-menu-button"
        type="button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : "false"}
        aria-controls="account-menu"
        onClick={toggleMenu}
      >
        Account
      </button>

      <ul id="account-menu" ref={menuRef} hidden={!open} aria-label="Account">
        <li>
          <a href="/profile">Profile</a>
        </li>
        <li>
          <a href="/settings">Settings</a>
        </li>
        <li>
          <a href="/billing">Billing</a>
        </li>
        <li>
          <button type="button" onClick={closeMenu}>
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}