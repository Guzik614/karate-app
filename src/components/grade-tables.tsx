import { Belt, beltDescription } from "@/components/belt";
import { JUNIOR_MAX_AGE, LOWEST_SENIOR_ONLY_KYU, SENIOR_MIN_AGE } from "@/content/grades";
import type { Grade } from "@/lib/types";

// Tabele stopni w trzech częściach: Junior (z podstopniami), Senior (kyu) i Dan.
// Używane na stronie /wiedza/stopnie i w artykule o systemie stopni.
export function GradeTables({ grades }: { grades: Grade[] }) {
  const junior = grades.filter((g) => g.track === "junior");
  const seniorKyu = grades.filter((g) => g.track === "senior" && g.kyu !== null);
  const dan = grades.filter((g) => g.dan !== null);

  // Juniorzy: podstopnie tego samego kyu trzymamy razem w jednej grupie.
  const juniorByKyu = new Map<number, Grade[]>();
  for (const g of junior) juniorByKyu.set(g.kyu!, [...(juniorByKyu.get(g.kyu!) ?? []), g]);

  return (
    <div className="space-y-10">
      <section>
        <TrackHeader name="Stopnie juniorskie" detail={`do ${JUNIOR_MAX_AGE} lat · ${junior.length} stopni`} />
        <p className="mb-3 text-sm text-muted">
          Każde kyu ma podstopnie oznaczone czerwonymi belkami: x.1 to jedna belka, x.2 dwie, x.3 trzy.
        </p>
        <div className="divide-y-2 divide-border rounded-xl border border-border bg-card">
          {[...juniorByKyu].map(([kyu, subs]) => (
            <div key={kyu}>
              <h3 className="px-4 pt-3 text-xs font-semibold tracking-wider text-accent-text uppercase">{kyu} kyu</h3>
              <ol className="divide-y divide-border/60">
                {subs.map((g) => (
                  <GradeRow key={g.code} grade={g} />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section>
        <TrackHeader name="Stopnie seniorskie (kyu)" detail={`od ${SENIOR_MIN_AGE} lat · ${seniorKyu.length} stopni`} />
        <ol className="divide-y divide-border rounded-xl border border-border bg-card">
          {seniorKyu.map((g) => (
            <GradeRow key={g.code} grade={g} seniorOnly={(g.kyu ?? 99) <= LOWEST_SENIOR_ONLY_KYU} />
          ))}
        </ol>
      </section>

      <section>
        <TrackHeader name="Stopnie mistrzowskie (dan)" detail="czarny pas · złote belki" />
        <ol className="divide-y divide-border rounded-xl border border-border bg-card">
          {dan.map((g) => (
            <GradeRow key={g.code} grade={g} />
          ))}
        </ol>
      </section>
    </div>
  );
}

function TrackHeader({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="mb-3 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
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
    <li className="grid grid-cols-[5rem_1fr] items-center gap-x-3 gap-y-1.5 px-4 py-3 sm:grid-cols-[5rem_10rem_1fr]">
      <span className="font-semibold tabular-nums">{grade.label}</span>
      <Belt grade={grade} className="h-5 w-full max-w-40" />
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
