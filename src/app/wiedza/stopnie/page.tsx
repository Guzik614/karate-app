import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/card-link";
import { GradeTables } from "@/components/grade-tables";
import { JUNIOR_MAX_AGE, LOWEST_SENIOR_ONLY_KYU, SENIOR_MIN_AGE } from "@/content/grades";
import { getGrades } from "@/lib/data";

export const metadata: Metadata = {
  title: "Stopnie i pasy",
  description: "System stopni Kyokushin w dwóch torach: Junior (do 15 lat) z podstopniami i Senior (od 16 lat).",
};

export default async function GradesPage() {
  const grades = await getGrades();

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
          Każde kyu od 10. do 5. ma trzy podstopnie: 10.1, 10.2 i 10.3. Podstopień oznaczają czerwone belki na pasie:
          jedna, dwie lub trzy.
        </Rule>
        <Rule title={`Senior: od ${SENIOR_MIN_AGE} lat`}>
          Pełne kyu od 10. do 1., a potem stopnie mistrzowskie od 1. do 10. dan. Każdy egzamin to od razu kolejne kyu.
        </Rule>
        <Rule title={`Od ${LOWEST_SENIOR_ONLY_KYU}. kyu tylko seniorzy`}>
          Egzaminy na {LOWEST_SENIOR_ONLY_KYU}. kyu i wyższe stopnie mogą zdawać wyłącznie osoby, które ukończyły{" "}
          {SENIOR_MIN_AGE} lat.
        </Rule>
      </section>

      <GradeTables grades={grades} />
      <p className="mt-6 text-sm text-muted">
        Po ukończeniu {SENIOR_MIN_AGE} lat zawodnik przechodzi do toru Senior i kontynuuje zdobywanie stopni w systemie
        pełnych kyu.
      </p>
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
