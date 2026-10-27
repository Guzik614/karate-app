import type { Metadata } from "next";
import Link from "next/link";
import { Belt } from "@/components/belt";
import { CardLink, PageHeader } from "@/components/card-link";
import { JUNIOR_MAX_AGE, SENIOR_MIN_AGE } from "@/content/grades";
import { getGrades, getPrograms } from "@/lib/data";
import type { Grade, Program } from "@/lib/types";

export const metadata: Metadata = { title: "Programy treningowe" };

export default async function ProgramsPage() {
  const [programs, grades] = await Promise.all([getPrograms(), getGrades()]);

  const byGrade = Map.groupBy(
    programs.filter((p) => p.grade_code),
    (p: Program) => p.grade_code!,
  );
  const other = programs.filter((p) => !p.grade_code);

  // Na start polecamy pierwsze programy obu torów (najniższe stopnie z programem).
  const firstWithProgram = (track: Grade["track"]) =>
    grades.find((g) => g.track === track && g.kyu !== null && byGrade.has(g.code));
  const starters = [firstWithProgram("junior"), firstWithProgram("senior")].filter((g) => g !== undefined);

  const tracks = [
    {
      name: "Stopnie juniorskie",
      detail: `do ${JUNIOR_MAX_AGE} lat · 10.1, 10.2, 10.3…`,
      grades: grades.filter((g) => g.track === "junior"),
    },
    {
      name: "Stopnie seniorskie",
      detail: `od ${SENIOR_MIN_AGE} lat · 10, 9, 8… kyu`,
      grades: grades.filter((g) => g.track === "senior" && g.kyu !== null),
    },
    { name: "Stopnie mistrzowskie", detail: "1–10 dan", grades: grades.filter((g) => g.dan !== null) },
  ];

  return (
    <>
      <PageHeader
        title="Programy treningowe"
        lead="Plany przygotowania do kolejnych stopni: lista technik, liczba powtórzeń i wskazówki na każdy dzień. Wybierz swój tor i stopień, do którego się przygotowujesz."
      />

      {starters.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-accent-text uppercase">Zacznij tutaj</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {starters.map((grade) =>
              byGrade.get(grade.code)!.map((p) => (
                <CardLink
                  key={p.id}
                  href={`/programy/${p.slug}`}
                  title={p.title}
                  subtitle={p.description}
                  meta={[p.level, p.duration_weeks && `${p.duration_weeks} tyg.`].filter(Boolean).join(" · ")}
                >
                  <Belt grade={grade} className="mt-3 h-4 w-32" />
                </CardLink>
              )),
            )}
          </div>
        </section>
      )}

      <div className="space-y-10">
        {tracks.map((track) => (
          <section key={track.name}>
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                <span className="mr-2 inline-block h-5 w-1.5 translate-y-0.5 rounded-full bg-accent" />
                {track.name}
              </h2>
              <span className="text-sm text-muted">{track.detail}</span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {track.grades.map((grade) => (
                <GradeCard key={grade.code} grade={grade} programs={byGrade.get(grade.code) ?? []} />
              ))}
            </ul>
          </section>
        ))}

        {other.length > 0 && (
          <section>
            <h2 className="mb-3 text-2xl font-bold tracking-tight">Inne programy</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {other.map((p) => (
                <CardLink key={p.id} href={`/programy/${p.slug}`} title={p.title} subtitle={p.description} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

function GradeCard({ grade, programs }: { grade: Grade; programs: Program[] }) {
  const ready = grade.requirements || programs.length;
  return (
    <li>
      <Link
        href={`/programy/stopien/${grade.code}`}
        className={`group block h-full rounded-xl border border-border bg-card p-3 transition-colors hover:border-accent hover:bg-card-hover ${ready ? "" : "opacity-60"}`}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold tabular-nums group-hover:text-accent-text">{grade.label}</span>
          <Belt grade={grade} className="h-4 w-28" />
        </div>
        <ul className="mt-2 space-y-0.5 text-sm">
          {grade.requirements && <li className="text-accent-text">Wymagania egzaminacyjne →</li>}
          {programs.map((p) => (
            <li key={p.id} className="text-muted">
              Plan: {p.title}
            </li>
          ))}
          {!ready && <li className="text-muted">Wymagania w przygotowaniu</li>}
        </ul>
      </Link>
    </li>
  );
}
