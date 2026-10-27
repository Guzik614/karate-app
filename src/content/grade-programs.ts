// Programy treningowe budowane z wymagań egzaminacyjnych KWF (src/content/grade-requirements.ts).
// Każdy stopień dostaje plan na 3 dni w tygodniu, w którym są tylko techniki potrzebne na egzamin.

import type { Grade } from "@/lib/types";
import { getGradeRequirements, techniqueSlug, type RequirementSection } from "./grade-requirements";
import { seedGrades } from "./grades";

export type SeedProgramItem = {
  day: number;
  technique: string | null; // slug techniki; null = ćwiczenie opisane w notes
  reps: string | null;
  notes: string | null;
};

export type SeedProgram = {
  slug: string;
  title: string;
  description: string;
  level: string;
  duration_weeks: number | null;
  grade_code: string;
  items: SeedProgramItem[];
};

// Dzień 1: pozycje i technika rąk. Dzień 2: kopnięcia i poruszanie się. Dzień 3: kata, kumite, sprawność.
const DAY_BY_LABEL: Record<string, number> = {
  "Teoria i komendy": 1,
  "Pozycje (tachikata)": 1,
  "Uderzenia i cięcia (tsuki / uchi)": 1,
  "Bloki (uke)": 1,
  "Kopnięcia (keri)": 2,
  "Ido (poruszanie się w pozycjach)": 2,
  "Pozycje i poruszanie się": 2,
  "Renraku (kombinacje)": 2,
  Kata: 3,
  "Kata autorskie": 3,
  Kumite: 3,
  "Kokyu ho (oddychanie)": 3,
  "Test sprawności": 3,
};

type Reps = Record<string, string>;
const JUNIOR_REPS: Reps = {
  "Pozycje (tachikata)": "3 × 20 s",
  "Uderzenia i cięcia (tsuki / uchi)": "2 × 10 na stronę",
  "Bloki (uke)": "2 × 10 na stronę",
  "Kopnięcia (keri)": "2 × 8 na nogę",
  "Ido (poruszanie się w pozycjach)": "2 × 6 kroków",
  "Pozycje i poruszanie się": "2 × 1 minuta",
  "Renraku (kombinacje)": "3 × na stronę",
  Kata: "3 powtórzenia",
  Kumite: "3 × z partnerem",
  "Kokyu ho (oddychanie)": "5 oddechów",
};
const SENIOR_REPS: Reps = {
  "Pozycje (tachikata)": "3 × 45 s",
  "Uderzenia i cięcia (tsuki / uchi)": "3 × 20 na stronę",
  "Bloki (uke)": "3 × 15 na stronę",
  "Kopnięcia (keri)": "3 × 15 na nogę",
  "Ido (poruszanie się w pozycjach)": "3 × 10 kroków",
  "Pozycje i poruszanie się": "3 × 2 minuty",
  "Renraku (kombinacje)": "5 × na stronę",
  Kata: "5 powtórzeń",
  Kumite: "5 × z partnerem",
  "Kokyu ho (oddychanie)": "10 oddechów",
};

function sectionItems(section: RequirementSection, reps: Reps): SeedProgramItem[] {
  const day = DAY_BY_LABEL[section.label];
  if (!day) return []; // wiek i staż, uprawnienia itp. nie są ćwiczeniami
  return section.items.map((item) => {
    if (section.label === "Teoria i komendy") {
      return { day, technique: null, reps: "Quiz", notes: `Teoria: ${item}` };
    }
    if (section.label === "Test sprawności") {
      return { day, technique: null, reps: "Test", notes: item };
    }
    if (section.video) {
      return { day, technique: techniqueSlug(item), reps: reps[section.label] ?? null, notes: item };
    }
    return { day, technique: null, reps: reps[section.label] ?? null, notes: `${section.label}: ${item}` };
  });
}

// Pół roku między egzaminami, od 4 kyu do 1 kyu rok.
function durationWeeks(grade: Grade) {
  if (grade.kyu === null) return null;
  return grade.kyu < 4 ? 52 : 26;
}

function programSlug(grade: Grade) {
  if (grade.code === "J-10.1") return "start-10-1-kyu";
  if (grade.code === "S-10") return "start-10-kyu";
  return `przygotowanie-${grade.code.toLowerCase().replace(".", "-")}`;
}

function programFor(grade: Grade, isFirst: boolean, track: string): SeedProgram | null {
  const requirements = getGradeRequirements(grade.code);
  if (!requirements?.sections.length) return null;
  const reps = grade.track === "junior" ? JUNIOR_REPS : SENIOR_REPS;
  const items = requirements.sections
    .flatMap((s) => sectionItems(s, reps))
    .sort((a, b) => a.day - b.day);
  if (!isFirst) {
    items.push({
      day: 3,
      technique: null,
      reps: "15 minut",
      notes: "Powtórka wymagań z niższych stopni: na egzaminie obowiązują wszystkie wcześniejsze techniki.",
    });
  }

  return {
    slug: programSlug(grade),
    title: isFirst ? `Start ${track}: przygotowanie do ${grade.label}` : `Przygotowanie do ${grade.label}`,
    description: `Plan zgodny z wymaganiami egzaminacyjnymi KWF na ${grade.label}. Trzy dni w tygodniu: dzień 1 pozycje i technika rąk, dzień 2 kopnięcia i poruszanie się, dzień 3 kata, kumite i sprawność.`,
    level: `${isFirst ? "Początkujący" : grade.label} · ${track}`,
    duration_weeks: durationWeeks(grade),
    grade_code: grade.code,
    items,
  };
}

function trackName(grade: Grade) {
  if (grade.dan !== null) return "Dan";
  return grade.track === "junior" ? "Junior" : "Senior";
}

export const gradePrograms: SeedProgram[] = seedGrades
  .map((grade, i, all) => {
    const track = trackName(grade);
    const isFirst = all.findIndex((g) => trackName(g) === track) === i && track !== "Dan";
    return programFor(grade, isFirst, track);
  })
  .filter((p) => p !== null);
