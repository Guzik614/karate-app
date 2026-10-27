// Wgrywa treści startowe z src/content do Supabase.
// Uruchom: npm run db:seed  (wymaga NEXT_PUBLIC_SUPABASE_URL i SUPABASE_SERVICE_ROLE_KEY w .env.local)
// Skrypt jest idempotentny: istniejące rekordy (po slug/term) są aktualizowane.

import { createClient } from "@supabase/supabase-js";
import { seedGlossary } from "../src/content/glossary";
import { seedGrades } from "../src/content/grades";
import { knowledgeCategories, seedArticles } from "../src/content/knowledge";
import { seedPrograms, seedTechniques } from "../src/content/training";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Brak NEXT_PUBLIC_SUPABASE_URL lub SUPABASE_SERVICE_ROLE_KEY w .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function run<T>(label: string, promise: PromiseLike<{ data: T; error: unknown }>) {
  const { data, error } = await promise;
  if (error) {
    console.error(`✗ ${label}`, error);
    process.exit(1);
  }
  console.log(`✓ ${label}`);
  return data;
}

async function main() {
  // Stopnie razem z wymaganiami egzaminacyjnymi KWF (src/content/grade-requirements.ts).
  await run("stopnie i wymagania egzaminacyjne", supabase.from("grades").upsert(seedGrades, { onConflict: "code" }));
  await run(
    "kategorie wiedzy",
    supabase.from("knowledge_categories").upsert(knowledgeCategories, { onConflict: "slug" }),
  );
  // Artykuły wgrywamy tylko, jeśli nie istnieją, żeby nie nadpisać zmian z panelu admina.
  await run(
    "artykuły",
    supabase.from("articles").upsert(seedArticles, { onConflict: "slug", ignoreDuplicates: true }),
  );
  await run(
    "słowniczek",
    supabase
      .from("glossary_terms")
      .upsert(
        seedGlossary.map((g, i) => ({ ...g, sort_order: i })),
        { onConflict: "term" },
      ),
  );

  const techniques = await run(
    "techniki",
    supabase.from("techniques").upsert(seedTechniques, { onConflict: "slug" }).select("id, slug"),
  );
  const techniqueId = new Map(techniques!.map((t) => [t.slug, t.id]));

  for (const { items, ...program } of seedPrograms) {
    const saved = await run(
      `program „${program.title}”`,
      supabase.from("programs").upsert(program, { onConflict: "slug" }).select("id").single(),
    );
    await run("  elementy programu (czyszczenie)", supabase.from("program_items").delete().eq("program_id", saved!.id));
    await run(
      "  elementy programu",
      supabase.from("program_items").insert(
        items.map((item, i) => ({
          program_id: saved!.id,
          technique_id: techniqueId.get(item.technique) ?? null,
          day: item.day,
          reps: item.reps,
          notes: item.notes,
          sort_order: i,
        })),
      ),
    );
  }

  console.log("Gotowe. Osu!");
}

main();
