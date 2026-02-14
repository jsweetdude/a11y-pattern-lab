import Link from "next/link";
import { CollectionRow } from "@/components/CollectionRowDemo";

export default function CollectionRowPage() {
  return (
    <main className="page-wrap">
      <p>
        <Link href="/">Back to home</Link>
      </p>
      <h1>Collection Row</h1>
      <CollectionRow />
    </main>
  );
}
