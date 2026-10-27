import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/markdown";
import { getArticleBySlug } from "@/lib/data";

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

// Statyczne, stuprocentowo pewne dane stopni z belkami, żeby strona od razu ożyła
const staticGrades = [
  // Junior (do 15 lat)
  { id: 'j1', name: '10.1 kyu', category: 'junior', belt_color: 'pomarańczowy + 1 czerwona belka', description: 'Podstopień juniorski (od 6 lat)' },
  { id: 'j2', name: '10.2 kyu', category: 'junior', belt_color: 'pomarańczowy + 2 czerwone belki', description: 'Podstopień juniorski' },
  { id: 'j3', name: '9 kyu', category: 'junior', belt_color: 'pomarańczowy', description: 'Pełny pas pomarańczowy' },
  { id: 'j4', name: '8.1 kyu', category: 'junior', belt_color: 'niebieski + 1 czerwona belka', description: 'Podstopień niebieskiego pasa' },
  { id: 'j5', name: '8.2 kyu', category: 'junior', belt_color: 'niebieski + 2 czerwone belki', description: 'Podstopień niebieskiego pasa' },
  { id: 'j6', name: '7 kyu', category: 'junior', belt_color: 'niebieski', description: 'Pełny pas niebieski' },
  { id: 'j7', name: '6.1 kyu', category: 'junior', belt_color: 'żółty + 1 czerwona belka', description: 'Podstopień żółtego pasa' },
  { id: 'j8', name: '6.2 kyu', category: 'junior', belt_color: 'żółty + 2 czerwone belki', description: 'Podstopień żółtego pasa' },
  { id: 'j9', name: '5 kyu', category: 'junior', belt_color: 'żółty', description: 'Pełny pas żółty' },
  { id: 'j10', name: '4.1 kyu', category: 'junior', belt_color: 'zielony + 1 czerwona belka', description: 'Podstopień zielonego pasa' },

  // Senior (od 16 lat)
  { id: 's1', name: '10 kyu', category: 'senior', belt_color: 'pomarańczowy', description: 'Początkowy stopień seniorski' },
  { id: 's2', name: '9 kyu', category: 'senior', belt_color: 'pomarańczowy z czarnym paskiem', description: '9 kyu senior' },
  { id: 's3', name: '8 kyu', category: 'senior', belt_color: 'niebieski', description: '8 kyu senior' },
  { id: 's4', name: '7 kyu', category: 'senior', belt_color: 'niebieski z czarnym paskiem', description: '7 kyu senior' },
  { id: 's5', name: '6 kyu', category: 'senior', belt_color: 'żółty', description: '6 kyu senior' },
  { id: 's6', name: '5 kyu', category: 'senior', belt_color: 'żółty z czarnym paskiem', description: '5 kyu senior' },
  { id: 's7', name: '4 kyu', category: 'senior', belt_color: 'zielony', description: '4 kyu senior' },
  { id: 's8', name: '3 kyu', category: 'senior', belt_color: 'zielony z czarnym paskiem', description: '3 kyu senior' },
  { id: 's9', name: '2 kyu', category: 'senior', belt_color: 'brązowy', description: '2 kyu senior' },
  { id: 's10', name: '1 kyu', category: 'senior', belt_color: 'brązowy ze złotym paskiem', description: '1 kyu senior' },

  // Dan (Mistrzowskie)
  { id: 'd1', name: '1 Dan', category: 'dan', belt_color: 'czarny + 1 złota belka', description: 'Shodan - Pierwszy Dan' },
  { id: 'd2', name: '2 Dan', category: 'dan', belt_color: 'czarny + 2 złote belki', description: 'Nidan - Drugi Dan' },
  { id: 'd3', name: '3 Dan', category: 'dan', belt_color: 'czarny + 3 złote belki', description: 'Sandan - Trzeci Dan' },
  { id: 'd4', name: '4 Dan', category: 'dan', belt_color: 'czarny + 4 złote belki', description: 'Yondan - Czwarty Dan' },
];

export default async function ArticlePage({ params }: PageProps<"/wiedza/[slug]">) {
  const { slug } = await params;
  
  const isGradesPage = slug === "system-stopni-kyu-dan";
  const article = isGradesPage ? null : await getArticleBySlug(slug);
  const grades = staticGrades;

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
