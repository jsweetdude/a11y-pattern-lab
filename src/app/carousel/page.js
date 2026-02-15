"use client";

import Link from "next/link";
import { CarouselDotsDemo } from "@/components/CarouselDotsDemo";
import { CarouselThumbnailsDemo } from "@/components/CarouselThumbnailsDemo";

export default function CarouselPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Carousel</h1>
      <section aria-labelledby="carousel-dot-navigation">
        <h2 id="carousel-dot-navigation">Carousel: Dot Navigation</h2>
        <CarouselDotsDemo ariaLabel="Featured shows" />
      </section>
      <section aria-labelledby="carousel-thumbnail-navigation">
        <h2 id="carousel-thumbnail-navigation">Carousel: Thumbnail Navigation</h2>
        <CarouselThumbnailsDemo ariaLabel="Featured shows" />
      </section>
    </main>
  );
}
