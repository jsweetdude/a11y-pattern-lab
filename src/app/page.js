import Link from "next/link";

export default function Home() {
  const componentPages = [
    { href: "/carousel", name: "Carousel", description: "Explore previous/next slide controls and announcements." },
    { href: "/collection-row", name: "Collection Row", description: "Browse a paged horizontal collection with keyboard-safe focus behavior." },
    { href: "/dialog", name: "Dialog / Modal", description: "Test focus management, trapping, and keyboard close behavior." },
    { href: "/grid", name: "Grid (Interactive)", description: "Try channel guide keyboard navigation and cell interactions." },
    { href: "/link", name: "Link", description: "Compare accessible text link patterns and states." },
    { href: "/toast", name: "Toast", description: "Try polite status updates and dismiss controls." },
  ];

  return (
    <main className="page-wrap">
      <h1>A11y Pattern Lab</h1>
      <p className="lede">
        A reachable sandbox for experimenting with accessible component patterns before promoting them into your MCP
        documentation library.
      </p>

      <nav aria-label="Component pattern pages">
        <ul className="card-list">
          {componentPages.map((page) => (
            <li key={page.href} className="card">
              <h2>
                <Link href={page.href}>{page.name}</Link>
              </h2>
              <p>{page.description}</p>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
