import Link from "next/link";
import { ChannelGuideGridDemo as GridChannelGuideDemo } from "@/components/GridChannelGuideDemo";

export default function GridPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Grid (Interactive)</h1>
      <section aria-labelledby="grid-channel-guide">
        <h2 id="grid-channel-guide">Grid: Channel Guide</h2>
        <GridChannelGuideDemo />
      </section>
    </main>
  );
}
