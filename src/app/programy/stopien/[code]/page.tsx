import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Belt, beltDescription } from "@/components/belt";
import { CardLink } from "@/components/card-link";
import { Markdown } from "@/components/markdown";
import { getGrades, getPrograms } from "@/lib/data";
import type { Grade } from "@/lib/types";

async function findGrade(code: string) {
  const grades = await getGrades();
  return grades.find((g) => g.code === decodeURIComponent(code));
}

function trackName(grade: Grade) {
  if (grade.dan !== null) return "Stopień mistrzowski";
  return grade.track === "junior" ? "Stopień juniorski" : "Stopień seniorski";
}

export async function generateMetadata({ params }: PageProps<"/programy/stopien/[code]">): Promise<Metadata> {
  const { code } = await params;
  const grade = await findGrade(code);
  return { title: grade ? `Przygotowanie do ${grade.label}` : "Stopień" };
}

export default async function GradePrepPage({ params }: PageProps<"/programy/stopien/[code]">) {
  const { code } = await params;
  const grade = await findGrade(code);
  if (!grade) notFound();
  const programs = (await getPrograms()).filter((p) => p.grade_code === grade.code);

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/programy" className="text-sm text-muted hover:text-accent-text">
          ← Programy
        </Link>
        <p className="mt-4 text-sm font-medium tracking-wider text-accent-text uppercase">{trackName(grade)}</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Przygotowanie do {grade.label}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-muted">
          <Belt grade={grade} className="h-5 w-40" />
          <span className="text-sm">{beltDescription(grade)}</span>
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-xl font-semibold">Wymagania egzaminacyjne</h2>
        {grade.requirements ? (
          <>
            <Markdown>{grade.requirements}</Markdown>
            <p className="mt-4 text-sm text-muted">
              Wymagania Polskiej Organizacji Karate Kyokushin (KWF). Na egzaminie obowiązują też wszystkie wymagania
              z niższych stopni.
            </p>
          </>
        ) : (
          <p className="text-muted">Wymagania na ten stopień są w przygotowaniu.</p>
        )}
      </section>

      {programs.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-semibold">Plan treningowy</h2>
          <div className="grid gap-3">
            {programs.map((p) => (
              <CardLink
                key={p.id}
                href={`/programy/${p.slug}`}
                title={p.title}
                subtitle={p.description}
                meta={[p.level, p.duration_weeks && `${p.duration_weeks} tyg.`].filter(Boolean).join(" · ")}
              />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
