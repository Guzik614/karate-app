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

export type GradeTrack = "junior" | "senior";

export type BeltColor = "white" | "orange" | "blue" | "yellow" | "green" | "brown" | "black" | "gold";

export type Grade = {
  code: string;
  track: GradeTrack;
  kyu: number | null;
  dan: number | null;
  sub: number | null;
  label: string;
  belt_color: BeltColor;
  stripe_color: BeltColor | null;
  red_stripes: number;
  gold_stripes: number;
  min_age: number | null;
  max_age: number | null;
  sort_order: number;
  requirements: string | null;
};

export const BELT_COLOR_LABELS: Record<BeltColor, string> = {
  white: "biały",
  orange: "pomarańczowy",
  blue: "niebieski",
  yellow: "żółty",
  green: "zielony",
  brown: "brązowy",
  black: "czarny",
  gold: "złoty",
};
