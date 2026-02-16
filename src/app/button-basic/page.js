"use client";

import Link from "next/link";
import { ButtonBasicDemo } from "@/components/ButtonBasicDemo";

export default function ButtonBasicPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Button (Basic)</h1>
      <section aria-labelledby="button-basic-demo">
        <h2 id="button-basic-demo">Button: Basic</h2>
        <ButtonBasicDemo />
      </section>
    </main>
  );
}
