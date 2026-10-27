import "server-only";
import { seedGlossary } from "@/content/glossary";
import { knowledgeCategories, seedArticles } from "@/content/knowledge";
import { seedPrograms, seedTechniques } from "@/content/training";
import { isSupabaseConfigured } from "./supabase/env";
import { createClient } from "./supabase/server";
import type {
  Article,
  GlossaryTerm,
  KnowledgeCategory,
  Program,
  ProgramItem,
  Technique,
  TechniqueCategory,
} from "./types";

// Warstwa dostępu do danych. Gdy Supabase nie jest skonfigurowany,
// zwraca treści startowe z src/content, żeby aplikację dało się od razu obejrzeć.

const TECHNIQUE_FIELDS =
  "id, slug, name, name_jp, category, subcategory, belt_level, description, mux_playback_id, sort_order";
const ARTICLE_FIELDS =
  "id, slug, title, excerpt, body, category_slug, published, sort_order, updated_at";

const localTechniques: Technique[] = seedTechniques.map((t) => ({
  ...t,
  id: t.slug,
  mux_playback_id: null,
}));

const localArticles: Article[] = seedArticles.map((a) => ({
  ...a,
  id: a.slug,
  updated_at: "2026-10-20T00:00:00Z",
}));

// ───────────────────────── Techniki ─────────────────────────

export async function getTechniques(category?: TechniqueCategory): Promise<Technique[]> {
  if (!isSupabaseConfigured) {
    return localTechniques.filter((t) => !category || t.category === category);
  }
  const supabase = await createClient();
  let query = supabase.from("techniques").select(TECHNIQUE_FIELDS).order("sort_order");
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getTechnique(slug: string): Promise<Technique | null> {
  if (!isSupabaseConfigured) {
    return localTechniques.find((t) => t.slug === slug) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("techniques")
    .select(TECHNIQUE_FIELDS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data;
}

// ───────────────────────── Programy ─────────────────────────

export async function getPrograms(): Promise<Program[]> {
  if (!isSupabaseConfigured) {
    return seedPrograms.map((p) => ({
      id: p.slug,
      slug: p.slug,
      title: p.title,
      description: p.description,
      level: p.level,
      duration_weeks: p.duration_weeks,
    }));
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("programs")
    .select("id, slug, title, description, level, duration_weeks")
    .order("created_at");
  if (error) throw error;
  return data;
}

export async function getProgram(
  slug: string,
): Promise<{ program: Program; items: ProgramItem[] } | null> {
  if (!isSupabaseConfigured) {
    const p = seedPrograms.find((p) => p.slug === slug);
    if (!p) return null;
    const { items, ...program } = p;
    return {
      program: { ...program, id: p.slug },
      items: items.map((item, i) => {
        const t = localTechniques.find((t) => t.slug === item.technique);
        return {
          id: String(i),
          day: item.day,
          reps: item.reps,
          notes: item.notes,
          technique: t ? { slug: t.slug, name: t.name, name_jp: t.name_jp } : null,
        };
      }),
    };
  }
  const supabase = await createClient();
  const { data: program, error } = await supabase
    .from("programs")
    .select("id, slug, title, description, level, duration_weeks")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!program) return null;
  const { data: items, error: itemsError } = await supabase
    .from("program_items")
    .select("id, day, reps, notes, technique:techniques(slug, name, name_jp)")
    .eq("program_id", program.id)
    .order("day")
    .order("sort_order")
    .returns<ProgramItem[]>();
  if (itemsError) throw itemsError;
  return { program, items };
}

// ───────────────────────── Teoria i Wiedza ─────────────────────────

export async function getKnowledgeCategories(): Promise<KnowledgeCategory[]> {
  if (!isSupabaseConfigured) return knowledgeCategories;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("knowledge_categories")
    .select("slug, name, description, sort_order")
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function getArticles(options: { includeDrafts?: boolean } = {}): Promise<Article[]> {
  if (!isSupabaseConfigured) {
    return localArticles.filter((a) => options.includeDrafts || a.published);
  }
  const supabase = await createClient();
  let query = supabase.from("articles").select(ARTICLE_FIELDS).order("sort_order");
  if (!options.includeDrafts) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSupabaseConfigured) {
    return localArticles.find((a) => a.slug === slug && a.published) ?? null;
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_FIELDS)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!isSupabaseConfigured) return localArticles.find((a) => a.id === id) ?? null;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_FIELDS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function getGlossary(): Promise<GlossaryTerm[]> {
  if (!isSupabaseConfigured) {
    return seedGlossary.map((g) => ({ ...g, id: g.term }));
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("glossary_terms")
    .select("id, term, kanji, meaning, category, description")
    .order("sort_order")
    .order("term");
  if (error) throw error;
  return data;
}

// ───────────────────────── Stopnie (Grades) ─────────────────────────

export interface Grade {
  id: number;
  name: string;
  rank_order: number;
  category: 'junior' | 'senior' | 'dan';
  belt_color: string;
  min_age: number | null;
  description: string | null;
}

export async function getGrades(): Promise<Grade[]> {
  if (!isSupabaseConfigured) {
    return [];
  }
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("grades")
    .select("id, name, rank_order, category, belt_color, min_age, description")
    .order("rank_order", { ascending: true });
  if (error) throw error;
  return data || [];
}
