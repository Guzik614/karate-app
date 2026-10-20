"use client";

import { useMemo, useState } from "react";
import { GLOSSARY_CATEGORY_LABELS, type GlossaryCategory, type GlossaryTerm } from "@/lib/types";

// Polskie znaki i wielkość liter nie przeszkadzają w wyszukiwaniu („uraken”, „cios”, „kopniecie”).
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ł/g, "l");
}

export function GlossaryBrowser({ terms }: { terms: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GlossaryCategory | "all">("all");

  const categories = useMemo(
    () =>
      (Object.keys(GLOSSARY_CATEGORY_LABELS) as GlossaryCategory[]).filter((c) =>
        terms.some((t) => t.category === c),
      ),
    [terms],
  );

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return terms.filter(
      (t) =>
        (category === "all" || t.category === category) &&
        (!q ||
          normalize(`${t.term} ${t.meaning} ${t.description ?? ""} ${t.kanji ?? ""}`).includes(q)),
    );
  }, [terms, query, category]);

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Szukaj: uraken, kopnięcie, seiza…"
        className="w-full rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-accent"
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          Wszystkie
        </Chip>
        {categories.map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {GLOSSARY_CATEGORY_LABELS[c]}
          </Chip>
        ))}
      </div>

      <p className="text-sm text-muted">{filtered.length} pojęć</p>

      <dl className="divide-y divide-border rounded-xl border border-border bg-card">
        {filtered.map((t) => (
          <div key={t.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[14rem_1fr]">
            <dt>
              <span className="font-semibold">{t.term}</span>
              {t.kanji && <span className="ml-2 text-muted">{t.kanji}</span>}
            </dt>
            <dd>
              <span>{t.meaning}</span>
              {t.description && <p className="text-sm text-muted">{t.description}</p>}
            </dd>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-muted">Brak pojęć pasujących do wyszukiwania.</p>
        )}
      </dl>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors ${
        active ? "border-accent bg-accent text-white" : "border-border hover:border-accent"
      }`}
    >
      {children}
    </button>
  );
}
