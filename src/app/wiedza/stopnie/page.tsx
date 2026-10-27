import type { Metadata } from "next";
import Link from "next/link";
import { Belt, beltDescription } from "@/components/belt";
import { PageHeader } from "@/components/card-link";
import { JUNIOR_MAX_AGE, LOWEST_SENIOR_ONLY_KYU, SENIOR_MIN_AGE } from "@/content/grades";
import { getGrades } from "@/lib/data";
import type { Grade } from "@/lib/types";

export const metadata: Metadata = {
  title: "Stopnie i pasy",
  description: "System stopni Kyokushin w dwóch torach: Junior (do 15 lat) z podstopniami i Senior (od 16 lat).",
};

export default async function GradesPage() {
  const grades = await getGrades();
  const junior = grades.filter((g) => g.track === "junior");
  const seniorKyu = grades.filter((g) => g.track === "senior" && g.kyu !== null);
  const dan = grades.filter((g) => g.dan !== null);

  return (
    <>
      <Link href="/wiedza" className="text-sm text-muted hover:text-accent-text">
        ← Teoria i Wiedza
      </Link>
      <div className="mt-3">
        <PageHeader
          title="Stopnie i pasy"
          lead="W klubie obowiązują dwa tory stopni: Junior dla dzieci i młodzieży do 15 lat oraz Senior od 16 lat. Kolejność kyu i kolory pasów są takie same, różni je tempo zdobywania stopni."
        />
      </div>

      <section className="mb-8 grid gap-3 md:grid-cols-3">
        <Rule title={`Junior: do ${JUNIOR_MAX_AGE} lat`}>
          Każde kyu od 10. do 5. ma dwa podstopnie, np. 10.1 i 10.2. Podstopień oznacza czerwona belka na pasie: jedna
          lub dwie.
        </Rule>
        <Rule title={`Senior: od ${SENIOR_MIN_AGE} lat`}>
          Pełne kyu od 10. do 1., a potem stopnie mistrzowskie dan. Każdy egzamin to od razu kolejne kyu.
        </Rule>
        <Rule title={`Od ${LOWEST_SENIOR_ONLY_KYU}. kyu tylko seniorzy`}>
          Egzaminy na {LOWEST_SENIOR_ONLY_KYU}. kyu i wyższe stopnie mogą zdawać wyłącznie osoby, które ukończyły{" "}
          {SENIOR_MIN_AGE} lat.
        </Rule>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <TrackHeader name="Junior" detail={`do ${JUNIOR_MAX_AGE} lat · ${junior.length} stopni`} />
          <ol className="divide-y divide-border rounded-xl border border-border bg-card">
            {junior.map((g) => (
              <GradeRow key={g.code} grade={g} />
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">
            Po ukończeniu {SENIOR_MIN_AGE} lat zawodnik przechodzi do toru Senior i kontynuuje zdobywanie stopni w
            systemie pełnych kyu.
          </p>
        </section>

        <section>
          <TrackHeader name="Senior" detail={`od ${SENIOR_MIN_AGE} lat · kyu i dan`} />
          <ol className="divide-y divide-border rounded-xl border border-border bg-card">
            {seniorKyu.map((g) => (
              <GradeRow key={g.code} grade={g} seniorOnly={(g.kyu ?? 99) <= LOWEST_SENIOR_ONLY_KYU} />
            ))}
          </ol>
          <h3 className="mt-6 mb-2 font-semibold">Stopnie mistrzowskie (dan)</h3>
          <ol className="divide-y divide-border rounded-xl border border-border bg-card">
            {dan.map((g) => (
              <GradeRow key={g.code} grade={g} />
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">Kolejne stopnie dan oznacza się następnymi złotymi belkami.</p>
        </section>
      </div>
    </>
  );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h2 className="font-semibold text-accent-text">{title}</h2>
      <p className="mt-1 text-sm">{children}</p>
    </div>
  );
}

function TrackHeader({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-2xl font-bold tracking-tight">
        <span className="mr-2 inline-block h-5 w-1.5 translate-y-0.5 rounded-full bg-accent" />
        {name}
      </h2>
      <span className="text-sm text-muted">{detail}</span>
    </div>
  );
}

function GradeRow({ grade, seniorOnly = false }: { grade: Grade; seniorOnly?: boolean }) {
  return (
    <li className="grid grid-cols-[5.5rem_1fr] items-center gap-3 px-4 py-3 sm:grid-cols-[5.5rem_9rem_1fr]">
      <span className="font-semibold tabular-nums">{grade.label}</span>
      <Belt grade={grade} className="h-5 w-full max-w-36" />
      <span className="col-span-2 text-sm text-muted sm:col-span-1">
        {beltDescription(grade)}
        {seniorOnly && (
          <span className="ml-2 inline-block rounded bg-accent/15 px-1.5 py-0.5 text-xs font-medium text-accent-text">
            od {SENIOR_MIN_AGE} lat
          </span>
        )}
      </span>
    </li>
  );
}
