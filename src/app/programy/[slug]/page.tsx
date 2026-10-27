import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Belt } from "@/components/belt";
import { getTheoryQuiz } from "@/content/theory-quiz";
import { getGrades, getProgram } from "@/lib/data";
import type { ProgramItem } from "@/lib/types";

export async function generateMetadata({ params }: PageProps<"/programy/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProgram(slug);
  return { title: result?.program.title ?? "Program" };
}

export default async function ProgramPage({ params }: PageProps<"/programy/[slug]">) {
  const { slug } = await params;
  const result = await getProgram(slug);
  if (!result) notFound();
  const { program, items } = result;
  const grade = program.grade_code ? (await getGrades()).find((g) => g.code === program.grade_code) : undefined;

  const hasQuiz = grade ? getTheoryQuiz(grade.code).length > 0 : false;
  const days = Map.groupBy(items, (item: ProgramItem) => item.day);

  return (
    <article className="space-y-6">
      <Link href="/programy" className="text-sm text-muted hover:text-accent-text">
        ← Programy
      </Link>
      <header>
        {grade && (
          <p className="mb-2 flex items-center gap-3 text-sm font-medium text-accent-text">
            <Belt grade={grade} className="h-4 w-28" />
            Przygotowanie do {grade.label} ({grade.track === "junior" ? "Junior" : grade.dan ? "Dan" : "Senior"})
          </p>
        )}
        <h1 className="text-3xl font-bold tracking-tight">{program.title}</h1>
        {program.description && <p className="mt-2 max-w-2xl text-muted">{program.description}</p>}
        {grade && (
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link
              href={`/programy/stopien/${grade.code}`}
              className="rounded-lg border border-border px-3 py-1.5 hover:border-accent hover:text-accent-text"
            >
              Wymagania egzaminacyjne i filmy
            </Link>
            {hasQuiz && (
              <Link
                href={`/programy/stopien/${grade.code}#quiz`}
                className="rounded-lg bg-accent px-3 py-1.5 font-semibold text-white"
              >
                Quiz z teorii
              </Link>
            )}
          </div>
        )}
      </header>

      {[...days.entries()].map(([day, dayItems]) => (
        <section key={day} className="rounded-xl border border-border bg-card">
          <h2 className="border-b border-border px-4 py-3 font-semibold">Dzień {day}</h2>
          <ul className="divide-y divide-border">
            {dayItems.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  {item.technique ? (
                    <>
                      <Link href={`/techniki/${item.technique.slug}`} className="font-medium hover:text-accent-text">
                        {item.technique.name}
                      </Link>
                      {item.notes && item.notes !== item.technique.name && (
                        <p className="text-sm text-muted">{item.notes}</p>
                      )}
                    </>
                  ) : (
                    <ExerciseNote text={item.notes ?? "Ćwiczenie"} />
                  )}
                </div>
                {item.reps && <span className="shrink-0 text-sm font-medium">{item.reps}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

// „Rozgrzewka: Pajacyki” → mała etykieta etapu i nazwa ćwiczenia;
// „Teoria i komendy: …” → pogrubiona nazwa i opis pod spodem.
const PHASES = ["Rozgrzewka", "Schłodzenie"];

function ExerciseNote({ text }: { text: string }) {
  const i = text.indexOf(": ");
  if (i < 0 || i > 30) return <span className="font-medium">{text}</span>;
  const [label, rest] = [text.slice(0, i), text.slice(i + 2)];
  if (PHASES.includes(label)) {
    return (
      <>
        <p className="text-xs font-medium uppercase tracking-wide text-accent-text">{label}</p>
        <span className="font-medium">{rest}</span>
      </>
    );
  }
  return (
    <>
      <span className="font-medium">{label}</span>
      <p className="text-sm text-muted">{rest}</p>
    </>
  );
}
