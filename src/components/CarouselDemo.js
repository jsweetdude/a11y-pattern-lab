"use client";

import { useState } from "react";

const slides = [
  {
    title: "Slide 1: Clear controls",
    body: "Navigation buttons are real buttons with clear text labels.",
  },
  {
    title: "Slide 2: Context announced",
    body: "An aria-live region announces the current slide position.",
  },
  {
    title: "Slide 3: Keyboard friendly",
    body: "The controls are keyboard reachable and activate with Enter or Space.",
  },
];

export function CarouselDemo() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const previous = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));

  return (
    <section aria-label="Carousel demo">
      <p role="status" aria-live="polite" className="sr-only">
        Showing slide {index + 1} of {slides.length}: {current.title}
      </p>
      <article className="panel" aria-roledescription="carousel" aria-label="Example carousel">
        <h2>{current.title}</h2>
        <p>{current.body}</p>
        <div className="actions">
          <button type="button" onClick={previous} aria-label="Show previous slide">
            Previous
          </button>
          <button type="button" onClick={next} aria-label="Show next slide">
            Next
          </button>
        </div>
      </article>
    </section>
  );
}
