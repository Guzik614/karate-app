import type { Metadata } from "next";
import Link from "next/link";
import { CardLink, PageHeader } from "@/components/card-link";
import { getTechniques } from "@/lib/data";
import { TECHNIQUE_CATEGORY_LABELS, type TechniqueCategory } from "@/lib/types";

export const metadata: Metadata = { title: "Techniki" };

const CATEGORIES = Object.keys(TECHNIQUE_CATEGORY_LABELS) as TechniqueCategory[];

export default async function TechniquesPage({ searchParams }: PageProps<"/techniki">) {
  const { kategoria } = await searchParams;
  const active = CATEGORIES.find((c) => c === kategoria);
  const techniques = await getTechniques(active);

  return (
    <>
      <PageHeader
        title="Techniki"
        lead="Każda technika ma wideo z możliwością zwolnienia do 0,25× i opis najważniejszych punktów."
      />

      <div className="mb-6 flex gap-2 overflow-x-auto">
        <Tab href="/techniki" active={!active}>
          Wszystkie
        </Tab>
        {CATEGORIES.map((c) => (
          <Tab key={c} href={`/techniki?kategoria=${c}`} active={active === c}>
            {TECHNIQUE_CATEGORY_LABELS[c]}
          </Tab>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {techniques.map((t) => (
          <CardLink
            key={t.id}
            href={`/techniki/${t.slug}`}
            title={t.name}
            subtitle={t.name_jp}
            meta={`${TECHNIQUE_CATEGORY_LABELS[t.category]}${t.belt_level ? ` · ${t.belt_level}` : ""}`}
          >
            {!t.mux_playback_id && <p className="mt-2 text-xs text-muted">Wideo wkrótce</p>}
          </CardLink>
        ))}
      </div>
    </>
  );
}

function Tab({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm ${
        active ? "border-accent bg-accent text-white" : "border-border hover:border-accent"
      }`}
    >
      {children}
    </Link>
  );
}
