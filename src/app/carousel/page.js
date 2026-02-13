import Link from "next/link";
import { CarouselDemo } from "@/components/CarouselDemo";

export default function CarouselPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Carousel</h1>
      <CarouselDemo />
      <section className="notes-panel" aria-labelledby="carousel-notes-title">
        <h2 id="carousel-notes-title">Pattern notes</h2>
        <label htmlFor="carousel-notes-input">Your notes</label>
        <textarea
          id="carousel-notes-input"
          name="carousel-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
