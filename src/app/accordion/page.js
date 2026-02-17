import Link from "next/link";
import { AccordionDemo } from "@/components/AccordionDemo";

export default function AccordionPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Accordion</h1>
      <AccordionDemo />
      <section className="notes-panel" aria-labelledby="accordion-notes-title">
        <h2 id="accordion-notes-title">Pattern notes</h2>
        <label htmlFor="accordion-notes-input">Your notes</label>
        <textarea
          id="accordion-notes-input"
          name="accordion-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
