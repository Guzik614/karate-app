import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/card-link";
import { GlossaryBrowser } from "@/components/glossary-browser";
import { getGlossary } from "@/lib/data";

export const metadata: Metadata = { title: "Słowniczek" };

export default async function GlossaryPage() {
  const terms = await getGlossary();
  return (
    <>
      <Link href="/wiedza" className="text-sm text-muted hover:text-accent-text">
        ← Teoria i Wiedza
      </Link>
      <div className="mt-3">
        <PageHeader
          title="Słowniczek"
          lead="Japońskie komendy, nazwy technik, pozycji i kata używane na treningach Kyokushin."
        />
      </div>
      <GlossaryBrowser terms={terms} />
    </>
  );
}
