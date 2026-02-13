import Link from "next/link";

export function LinkDemo() {
  return (
    <section aria-label="Link demo" className="panel">
      <h2>Link Patterns</h2>
      <p>
        This page compares meaningful link text and purpose. Links should make sense out of context and indicate what
        happens next.
      </p>
      <ul className="link-list">
        <li>
          <Link href="/">Return to the pattern hub home page</Link>
        </li>
        <li>
          <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">
            Open WAI-ARIA Authoring Practices (new tab)
          </a>
        </li>
        <li>
          <a href="#current-section">Jump to current section details</a>
        </li>
      </ul>
      <h3 id="current-section">Current section details</h3>
      <p>Use this anchor target to test skip-style in-page navigation and browser focus behavior.</p>
    </section>
  );
}
