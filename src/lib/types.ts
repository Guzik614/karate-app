export type TechniqueCategory = "kihon" | "kata" | "kihon_kumite";

export type Technique = {
  id: string;
  slug: string;
  name: string;
  name_jp: string | null;
  category: TechniqueCategory;
  subcategory: string | null;
  belt_level: string | null;
  description: string | null;
  mux_playback_id: string | null;
  sort_order: number;
};

export type Program = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  level: string | null;
  duration_weeks: number | null;
};

export type ProgramItem = {
  id: string;
  day: number;
  reps: string | null;
  notes: string | null;
  technique: Pick<Technique, "slug" | "name" | "name_jp"> | null;
};

export type KnowledgeCategory = {
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category_slug: string;
  published: boolean;
  sort_order: number;
  updated_at: string;
};

export type GlossaryCategory =
  | "komendy"
  | "etykieta"
  | "ciało"
  | "pozycje"
  | "tsuki"
  | "uchi"
  | "uke"
  | "geri"
  | "kata"
  | "liczenie"
  | "ogólne";

export type GlossaryTerm = {
  id: string;
  term: string;
  kanji: string | null;
  meaning: string;
  category: GlossaryCategory;
  description: string | null;
};

export const TECHNIQUE_CATEGORY_LABELS: Record<TechniqueCategory, string> = {
  kihon: "Kihon",
  kata: "Kata",
  kihon_kumite: "Kihon kumite",
};

export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  komendy: "Komendy",
  etykieta: "Etykieta i dojo",
  "ciało": "Części ciała i poziomy",
  pozycje: "Pozycje (dachi)",
  tsuki: "Uderzenia pięścią (tsuki)",
  uchi: "Uderzenia (uchi)",
  uke: "Bloki (uke)",
  geri: "Kopnięcia (geri)",
  kata: "Kata",
  liczenie: "Liczenie",
  "ogólne": "Pojęcia ogólne",
};
