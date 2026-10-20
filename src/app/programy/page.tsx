import type { Metadata } from "next";
import { CardLink, PageHeader } from "@/components/card-link";
import { getPrograms } from "@/lib/data";

export const metadata: Metadata = { title: "Programy treningowe" };

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <PageHeader
        title="Programy treningowe"
        lead="Gotowe plany treningowe z listą technik, liczbą powtórzeń i wskazówkami na każdy dzień."
      />
      <div className="grid gap-3 sm:grid-cols-2">
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
    </>
  );
}
