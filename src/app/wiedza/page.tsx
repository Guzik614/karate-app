import type { Metadata } from "next";
import Link from "next/link";
import { CardLink, PageHeader } from "@/components/card-link";
import { getArticles, getGlossary, getKnowledgeCategories } from "@/lib/data";

export const metadata: Metadata = { title: "Teoria i Wiedza" };

export default async function KnowledgePage() {
  const [categories, articles, glossary] = await Promise.all([
    getKnowledgeCategories(),
    getArticles(),
    getGlossary(),
  ]);

  return (
    <>
      <PageHeader
        title="Teoria i Wiedza"
        lead="Historia Kyokushin, Dojo Kun, etykieta, słowniczek japońskich pojęć i artykuły edukacyjne."
      />

      <Link
        href="/wiedza/slowniczek"
        className="mb-8 flex items-center justify-between rounded-xl border border-accent/40 bg-accent/5 p-5 transition-colors hover:bg-accent/10"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-accent">Słowniczek</p>
          <h2 className="text-xl font-semibold">Japońskie pojęcia i techniki</h2>
          <p className="text-sm text-muted">
            {glossary.length} pojęć: komendy, pozycje, ciosy, kopnięcia, bloki i kata.
          </p>
        </div>
        <span className="text-3xl text-accent">辞</span>
      </Link>

      <div className="space-y-8">
        {categories.map((category) => {
          const inCategory = articles.filter((a) => a.category_slug === category.slug);
          if (inCategory.length === 0) return null;
          return (
            <section key={category.slug} id={category.slug}>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              {category.description && <p className="mb-3 text-sm text-muted">{category.description}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {inCategory.map((a) => (
                  <CardLink key={a.id} href={`/wiedza/${a.slug}`} title={a.title} subtitle={a.excerpt} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
