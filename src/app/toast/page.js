import Link from "next/link";
import { ToastDemo } from "@/components/ToastDemo";

export default function ToastPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Toast</h1>
      <ToastDemo />
      <section className="notes-panel" aria-labelledby="toast-notes-title">
        <h2 id="toast-notes-title">Pattern notes</h2>
        <label htmlFor="toast-notes-input">Your notes</label>
        <textarea
          id="toast-notes-input"
          name="toast-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
