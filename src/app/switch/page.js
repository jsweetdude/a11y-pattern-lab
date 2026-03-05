import Link from "next/link";
import { SwitchDemo } from "@/components/SwitchDemo";

export default function SwitchPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Switch</h1>
      <SwitchDemo />
      <section className="notes-panel" aria-labelledby="switch-notes-title">
        <h2 id="switch-notes-title">Pattern notes</h2>
        <label htmlFor="switch-notes-input">Your notes</label>
        <textarea
          id="switch-notes-input"
          name="switch-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
