import type { Technique } from "@/lib/types";
import { gradePrograms } from "./grade-programs";
import { requirementTechniques } from "./grade-requirements";
import { seedGrades } from "./grades";

// Przykładowe techniki i program. Wideo podpinasz w panelu admina (upload do Mux).

type SeedTechnique = Omit<Technique, "id" | "mux_playback_id">;

const baseTechniques: SeedTechnique[] = [
  {
    slug: "seiken-chudan-tsuki",
    name: "Seiken chudan tsuki",
    name_jp: "正拳中段突き",
    category: "kihon",
    subcategory: "tsuki",
    belt_level: "10 kyu",
    description:
      "Prosty cios pięścią na poziom środkowy. Uderzasz dwoma pierwszymi kostkami, ramię prowadzisz po najkrótszej drodze, a druga ręka wraca do biodra (hikite).",
    sort_order: 1,
  },
  {
    slug: "uraken-ganmen-uchi",
    name: "Uraken ganmen uchi",
    name_jp: "裏拳顔面打ち",
    category: "kihon",
    subcategory: "uchi",
    belt_level: "10 kyu",
    description:
      "Uderzenie grzbietem pięści w twarz. Ruch jest biczowy: łokieć prowadzi, a nadgarstek strzela na końcu.",
    sort_order: 2,
  },
  {
    slug: "mae-geri",
    name: "Mae geri chudan",
    name_jp: "前蹴り中段",
    category: "kihon",
    subcategory: "geri",
    belt_level: "10 kyu",
    description:
      "Kopnięcie wprost na poziom środkowy, poduszką stopy. Unieś kolano wysoko, wyprostuj nogę i szybko ją cofnij.",
    sort_order: 3,
  },
  {
    slug: "gedan-barai",
    name: "Gedan barai",
    name_jp: "下段払い",
    category: "kihon",
    subcategory: "uke",
    belt_level: "10 kyu",
    description: "Blok dolny zmiatający. Ręka startuje od przeciwległego ucha i zmiata w dół nad kolanem.",
    sort_order: 4,
  },
  {
    slug: "taikyoku-sono-ichi",
    name: "Taikyoku sono ichi",
    name_jp: "太極その一",
    category: "kata",
    subcategory: null,
    belt_level: "10 kyu",
    description:
      "Pierwsze kata w Kyokushin. Uczy podstawowego przemieszczania się w kształcie litery H z gedan barai i seiken oi tsuki.",
    sort_order: 1,
  },
  {
    slug: "sanbon-kumite-jodan",
    name: "Sanbon kumite jodan",
    name_jp: "三本組手上段",
    category: "kihon_kumite",
    subcategory: null,
    belt_level: "9 kyu",
    description:
      "Trzy ataki seiken jodan oi tsuki i trzy bloki jodan uke z kontrą na koniec. Uczy dystansu i timingu.",
    sort_order: 1,
  },
];

// Każda technika z wymagań egzaminacyjnych dostaje własny wpis, do którego admin podpina film.
const gradeLabel = new Map(seedGrades.map((g) => [g.code, g.label]));
const baseSlugs = new Set(baseTechniques.map((t) => t.slug));

export const seedTechniques: SeedTechnique[] = [
  ...baseTechniques,
  // Najpierw seniorzy i dan, żeby nazwy technik pochodziły z tabeli KWF.
  ...requirementTechniques([
    ...seedGrades.filter((g) => g.track === "senior").map((g) => g.code),
    ...seedGrades.filter((g) => g.track === "junior").map((g) => g.code),
  ])
    .filter((t) => !baseSlugs.has(t.slug))
    .map((t, i) => ({
      slug: t.slug,
      name: t.name,
      name_jp: null,
      category: t.category,
      subcategory: null,
      belt_level: gradeLabel.get(t.firstGradeCode) ?? null,
      description: null,
      sort_order: 100 + i,
    })),
];

// Każdy program przygotowuje do jednego stopnia i zawiera tylko techniki z wymagań egzaminacyjnych.
export const seedPrograms = gradePrograms;
