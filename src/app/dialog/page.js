import Link from "next/link";
import { DialogDemo } from "@/components/DialogDemo";

export default function DialogPage() {
  return (
    <main id="app-root" className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Dialog / Modal</h1>
      <DialogDemo />
      <section className="notes-panel" aria-labelledby="dialog-notes-title">
        <h2 id="dialog-notes-title">Pattern notes</h2>
        <ul className="notes-list">
          <li>
            <code>{"<dialog>"}</code> is well supported as of 2026, but it introduces top-layer behavior that can
            conflict with portals and layered UI systems. For this reason, <code>{"<div role=\"dialog\">"} </code>
            is still more predictable and easier to control.
          </li>
          <li>
            <code>{'aria-modal="true"'}</code> does cause modern screen readers to treat background content as outside
            the interaction context of the modal dialog. However, it does not prevent tabbing outside the dialog or
            enforce focus trap behavior.
          </li>
          <li>
            Treat a modal as a separate top layer: render it outside the app content tree (in React, usually via a
            portal) so it sits on top, is not clipped by overflow, and avoids z-index layering bugs. While it is open,
            apply <code>inert</code> to the app root and keep keyboard focus trapped inside the modal until close to
            ensure reliable keyboard and screen reader behavior.
          </li>
        </ul>
        <label htmlFor="dialog-notes-input">Your notes</label>
        <textarea
          id="dialog-notes-input"
          name="dialog-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
