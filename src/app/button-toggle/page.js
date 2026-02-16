"use client";

import Link from "next/link";
import { ToggleButtonDemo } from "@/components/ButtonToggleDemo";

export default function ButtonTogglePage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Button (Toggle)</h1>
      <section aria-labelledby="button-toggle-demo">
        <h2 id="button-toggle-demo">Button: Toggle</h2>
        <ToggleButtonDemo />
      </section>
    </main>
  );
}
