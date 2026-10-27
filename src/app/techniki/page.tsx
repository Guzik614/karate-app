import type { Metadata } from "next";
import Link from "next/link";
import { Belt } from "@/components/belt";
import { CardLink, PageHeader } from "@/components/card-link";
import { requirementTechniques, sortByRequirements } from "@/content/grade-requirements";
import { getGrades, getTechniques } from "@/lib/data";
import { TECHNIQUE_CATEGORY_LABELS, type GradeTrack, type Technique, type TechniqueCategory } from "@/lib/types";

export const metadata: Metadata = { title: "Techniki" };

const CATEGORIES = Object.keys(TECHNIQUE_CATEGORY_LABELS) as TechniqueCategory[];
const TRACKS: { value: GradeTrack; label: string }[] = [
  { value: "senior", label: "Senior (od 16 lat)" },
  { value: "junior", label: "Junior (do 15 lat)" },
];

function href(track: GradeTrack, category?: TechniqueCategory) {
  const params = new URLSearchParams();
  if (track !== "senior") params.set("tor", track);
  if (category) params.set("kategoria", category);
  const query = params.toString();
  return query ? `/techniki?${query}` : "/techniki";
}

export default async function TechniquesPage({ searchParams }: PageProps<"/techniki">) {
  const { kategoria, tor } = await searchParams;
  const active = CATEGORIES.find((c) => c === kategoria);
  const track: GradeTrack = tor === "junior" ? "junior" : "senior";
  const [techniques, allGrades] = await Promise.all([getTechniques(active), getGrades()]);

  // Techniki układamy według stopnia, na którym pojawiają się po raz pierwszy w wymaganiach, od najniższego.
  const grades = allGrades.filter((g) => g.track === track);
  // W obrębie stopnia kolejność jak w wymaganiach: pozycje, uderzenia, bloki, kopnięcia, kata…
  const required = requirementTechniques(grades.map((g) => g.code));
  const firstGrade = new Map(required.map((t) => [t.slug, t.firstGradeCode]));
  const ordered = sortByRequirements(techniques, grades.map((g) => g.code));
  const byGrade = Map.groupBy(ordered, (t: Technique) => firstGrade.get(t.slug) ?? "inne");
  const groups = grades.filter((g) => byGrade.has(g.code));
  const other = byGrade.get("inne") ?? [];

  return (
    <>
      <PageHeader
        title="Techniki"
        lead="Techniki ułożone od najniższego do najwyższego stopnia, zgodnie z wymaganiami egzaminacyjnymi KWF. Każda ma wideo z możliwością zwolnienia do 0,25×."
      />

      <div className="mb-3 flex gap-2 overflow-x-auto">
        {TRACKS.map((t) => (
          <Tab key={t.value} href={href(t.value, active)} active={track === t.value}>
            {t.label}
          </Tab>
        ))}
      </div>
      <div className="mb-8 flex gap-2 overflow-x-auto">
        <Tab href={href(track)} active={!active} small>
          Wszystkie
        </Tab>
        {CATEGORIES.map((c) => (
          <Tab key={c} href={href(track, c)} active={active === c} small>
            {TECHNIQUE_CATEGORY_LABELS[c]}
          </Tab>
        ))}
      </div>

      <div className="space-y-10">
        {groups.map((grade) => (
          <section key={grade.code}>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight">{grade.label}</h2>
              <Belt grade={grade} className="h-4 w-28" />
              <Link
                href={`/programy/stopien/${grade.code}`}
                className="ml-auto text-sm text-muted hover:text-accent-text"
              >
                Wymagania na {grade.label} →
              </Link>
            </div>
            <TechniqueGrid techniques={byGrade.get(grade.code)!} />
          </section>
        ))}
        {other.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-bold tracking-tight">Pozostałe techniki</h2>
            <TechniqueGrid techniques={other} />
          </section>
        )}
      </div>
    </>
  );
}

function TechniqueGrid({ techniques }: { techniques: Technique[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {techniques.map((t) => (
        <CardLink
          key={t.id}
          href={`/techniki/${t.slug}`}
          title={t.name}
          subtitle={t.name_jp}
          meta={t.subcategory === "sprawnosc" ? "Sprawność" : TECHNIQUE_CATEGORY_LABELS[t.category]}
        >
          {!t.mux_playback_id && <p className="mt-2 text-xs text-muted">Wideo wkrótce</p>}
        </CardLink>
      ))}
    </div>
  );
}

function Tab({
  href,
  active,
  small,
  children,
}: {
  href: string;
  active: boolean;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full border ${small ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"} ${
        active ? "border-accent bg-accent text-white" : "border-border hover:border-accent"
      }`}
    >
      {children}
    </Link>
  );
}
