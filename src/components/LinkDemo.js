import { ExternalLink, Settings } from "lucide-react";

export function LinkDemo() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section>
        {/* Simple link: accessible name from visible text */}
        <a href="/account">Sign in</a>
      </section>

      <section>
        {/* Add context when needed (e.g., repeated links) */}
        <article
          aria-label="Product card example"
          style={{
            maxWidth: 320,
            border: "1px solid #d1d5db",
            borderRadius: 12,
            padding: 12,
            display: "grid",
            gap: 10,
            background: "#fff",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=700&q=80"
            alt="Blue reusable water bottle standing upright"
            style={{ width: "100%", borderRadius: 8, display: "block" }}
          />
          <h3 id="prod-1" style={{ margin: 0 }}>
            Superflo Water Bottle
          </h3>
          <a href="/products/1" aria-labelledby="prod-1-link prod-1">
            <span id="prod-1-link">Read more</span>
          </a>
        </article>
      </section>

      <section>
        {/* Opens in new tab: add accessible context + visible external icon */}
        <a
          href="https://example.com/report.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download report, opens in a new tab"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          Download report <ExternalLink size={16} aria-hidden="true" focusable="false" />
        </a>
      </section>

      <section>
        {/* Icon-only link: must provide an accessible name */}
        <a href="/settings" aria-label="Settings">
          <Settings size={18} aria-hidden="true" focusable="false" />
        </a>
      </section>
    </div>
  );
}
