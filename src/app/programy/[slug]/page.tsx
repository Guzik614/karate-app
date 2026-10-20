import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgram } from "@/lib/data";
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

  const days = Map.groupBy(items, (item: ProgramItem) => item.day);

  return (
    <article className="space-y-6">
      <Link href="/programy" className="text-sm text-muted hover:text-accent">
        ← Programy
      </Link>
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{program.title}</h1>
        {program.description && <p className="mt-2 max-w-2xl text-muted">{program.description}</p>}
      </header>

      {[...days.entries()].map(([day, dayItems]) => (
        <section key={day} className="rounded-xl border border-border bg-card">
          <h2 className="border-b border-border px-4 py-3 font-semibold">Dzień {day}</h2>
          <ul className="divide-y divide-border">
            {dayItems.map((item) => (
              <li key={item.id} className="flex items-start justify-between gap-4 px-4 py-3">
                <div>
                  {item.technique ? (
                    <Link href={`/techniki/${item.technique.slug}`} className="font-medium hover:text-accent">
                      {item.technique.name}
                    </Link>
                  ) : (
                    <span className="font-medium">Ćwiczenie</span>
                  )}
                  {item.notes && <p className="text-sm text-muted">{item.notes}</p>}
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
