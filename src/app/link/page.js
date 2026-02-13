import Link from "next/link";
import { LinkDemo } from "@/components/LinkDemo";

export default function LinkPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Link</h1>
      <LinkDemo />
      <section className="notes-panel" aria-labelledby="link-notes-title">
        <h2 id="link-notes-title">Pattern notes</h2>
        <label htmlFor="link-notes-input">Your notes</label>
        <textarea
          id="link-notes-input"
          name="link-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
