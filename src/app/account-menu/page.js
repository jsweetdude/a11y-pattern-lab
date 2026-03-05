import Link from "next/link";
import { AccountMenuDemo } from "@/components/AccountMenuDemo";

export default function AccountMenuPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Account Menu</h1>
      <AccountMenuDemo />
      <section className="notes-panel" aria-labelledby="account-menu-notes-title">
        <h2 id="account-menu-notes-title">Pattern notes</h2>
        <label htmlFor="account-menu-notes-input">Your notes</label>
        <textarea
          id="account-menu-notes-input"
          name="account-menu-notes"
          rows={8}
          placeholder="Capture observations, edge cases, and implementation decisions."
        />
      </section>
    </main>
  );
}
