import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getArticles, getKnowledgeCategories } from "@/lib/data";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const [articles, categories] = await Promise.all([
    getArticles({ includeDrafts: true }),
    getKnowledgeCategories(),
  ]);
  const categoryName = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Artykuły: Teoria i Wiedza</h1>
        <Link href="/admin/wiedza/nowy" className="rounded-lg bg-accent px-4 py-2 font-semibold text-white">
          + Nowy artykuł
        </Link>
      </div>
      <ul className="divide-y divide-border rounded-xl border border-border bg-card">
        {articles.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <Link href={`/admin/wiedza/${a.id}`} className="font-medium hover:text-accent">
                {a.title}
              </Link>
              <p className="text-sm text-muted">
                {categoryName(a.category_slug)} · /wiedza/{a.slug}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${
                a.published ? "bg-green-600/15 text-green-600" : "bg-stone-500/15 text-muted"
              }`}
            >
              {a.published ? "Opublikowany" : "Szkic"}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
