import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getArticleBySlug, getGrades } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/wiedza/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "system-stopni-kyu-dan") {
    return { 
      title: "System stopni: kyu i dan", 
      description: "Kolory pasów w Kyokushin oraz dwutorowy system egzaminacyjny (Junior / Senior)." 
    };
  }
  const article = await getArticleBySlug(slug);
  return { title: article?.title ?? "Artykuł", description: article?.excerpt ?? undefined };
}

export default async function ArticlePage({ params }: PageProps<"/wiedza/[slug]">) {
  const { slug } = await params;
  
  // Jeśli to strona o systemie stopni, wymuszamy renderowanie dynamicznych tabel z bazy grades
  const isGradesPage = slug === "system-stopni-kyu-dan";
  const article = isGradesPage ? null : await getArticleBySlug(slug);
  const grades = isGradesPage ? await getGrades() : [];

  if (!article && !isGradesPage) notFound();

  const title = isGradesPage ? "System stopni: kyu i dan" : (article?.title ?? "");
  const excerpt = isGradesPage 
    ? "Kolory pasów w Kyokushin oraz dwutorowy system egzaminacyjny (Junior / Senior)." 
    : (article?.excerpt ?? "");
  const categorySlug = article?.category_slug ?? "teoria";

  return (
    <article className="mx-auto max-w-4xl">
      <Link href={`/wiedza#${categorySlug}`} className="text-sm text-muted hover:text-accent-text">
        ← Teoria i Wiedza
      </Link>
      <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h1>
      {excerpt && <p className="mt-3 text-lg text-muted">{excerpt}</p>}
      
      <div className="mt-8">
        {article?.body && <Markdown>{article.body}</Markdown>}

        {isGradesPage && (
          <div className="mt-8 space-y-10">
            {/* Sekcja Junior */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-accent-text">Stopnie Juniorskie (do 15 roku życia - z belkami)</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface text-muted uppercase text-xs">
                    <tr>
                      <th className="p-3">Stopień</th>
                      <th className="p-3">Pas</th>
                      <th className="p-3">Wiek / Uwagi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {grades.filter(g => g.category === 'junior').map((grade) => (
                      <tr key={grade.id} className="hover:bg-accent/5">
                        <td className="p-3 font-medium">{grade.name}</td>
                        <td className="p-3">{grade.belt_color}</td>
                        <td className="p-3 text-muted">{grade.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sekcja Senior */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-accent-text">Stopnie Seniorskie (od 16 roku życia)</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface text-muted uppercase text-xs">
                    <tr>
                      <th className="p-3">Stopień</th>
                      <th className="p-3">Pas</th>
                      <th className="p-3">Opis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {grades.filter(g => g.category === 'senior').map((grade) => (
                      <tr key={grade.id} className="hover:bg-accent/5">
                        <td className="p-3 font-medium">{grade.name}</td>
                        <td className="p-3">{grade.belt_color}</td>
                        <td className="p-3 text-muted">{grade.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sekcja Dan */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-accent-text">Stopnie Mistrzowskie (Dan)</h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface text-muted uppercase text-xs">
                    <tr>
                      <th className="p-3">Stopień</th>
                      <th className="p-3">Pas</th>
                      <th className="p-3">Opis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {grades.filter(g => g.category === 'dan').map((grade) => (
                      <tr key={grade.id} className="hover:bg-accent/5">
                        <td className="p-3 font-medium">{grade.name}</td>
                        <td className="p-3">{grade.belt_color}</td>
                        <td className="p-3 text-muted">{grade.description || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
