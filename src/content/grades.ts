import type { BeltColor, Grade } from "@/lib/types";
import { requirementsMarkdown } from "./grade-requirements";

// System stopni Kyokushin w dwóch torach.
// Junior (do 15 lat): kyu 10–5, każde w trzech podstopniach oznaczanych czerwonymi belkami (10.1, 10.2, 10.3).
// Senior (od 16 lat): pełne kyu 10–1 i stopnie dan. Stopnie od 4. kyu w górę są tylko dla seniorów.
// `npm run db:seed` wgrywa tę listę do tabeli grades.

export const JUNIOR_MAX_AGE = 15;
export const SENIOR_MIN_AGE = 16;
export const LOWEST_SENIOR_ONLY_KYU = 4;
export const JUNIOR_SUBGRADES = 3;
export const MAX_DAN = 8; // KWF: stopnie mistrzowskie od 1. do 8. dan

// Artykuł w Teorii i Wiedzy, pod którym wyświetlamy pełne tabele stopni.
export const GRADES_ARTICLE_SLUG = "system-stopni-kyu-dan";

// Kyu dostępne w torze Junior. Wyższe kyu (od 4.) zdobywa się dopiero jako senior.
const JUNIOR_KYU = [10, 9, 8, 7, 6, 5];

// Kolor pasa i kolorowej belki (kolor kolejnego pasa) dla każdego kyu.
const KYU_BELTS: Record<number, { belt: BeltColor; stripe: BeltColor | null }> = {
  10: { belt: "orange", stripe: null },
  9: { belt: "orange", stripe: "blue" },
  8: { belt: "blue", stripe: null },
  7: { belt: "blue", stripe: "yellow" },
  6: { belt: "yellow", stripe: null },
  5: { belt: "yellow", stripe: "green" },
  4: { belt: "green", stripe: null },
  3: { belt: "green", stripe: "brown" },
  2: { belt: "brown", stripe: null },
  1: { belt: "brown", stripe: "black" },
};

function kyuGrade(track: Grade["track"], kyu: number, sub: number | null, sortOrder: number): Grade {
  const { belt, stripe } = KYU_BELTS[kyu];
  const code = track === "junior" ? `J-${kyu}.${sub}` : `S-${kyu}`;
  return {
    code,
    track,
    kyu,
    dan: null,
    sub,
    label: sub ? `${kyu}.${sub} kyu` : `${kyu} kyu`,
    belt_color: belt,
    stripe_color: stripe,
    red_stripes: sub ?? 0,
    gold_stripes: 0,
    min_age: track === "senior" ? SENIOR_MIN_AGE : null,
    max_age: track === "junior" ? JUNIOR_MAX_AGE : null,
    sort_order: sortOrder,
    requirements: requirementsMarkdown(code),
  };
}

const junior: Grade[] = JUNIOR_KYU.flatMap((kyu, i) =>
  Array.from({ length: JUNIOR_SUBGRADES }, (_, s) => kyuGrade("junior", kyu, s + 1, i * JUNIOR_SUBGRADES + s + 1)),
);

const seniorKyu: Grade[] = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((kyu, i) => kyuGrade("senior", kyu, null, i + 1));

const dan: Grade[] = Array.from({ length: MAX_DAN }, (_, i) => ({
  code: `D-${i + 1}`,
  track: "senior" as const,
  kyu: null,
  dan: i + 1,
  sub: null,
  label: `${i + 1} dan`,
  belt_color: "black" as const,
  stripe_color: null,
  red_stripes: 0,
  gold_stripes: i + 1,
  min_age: SENIOR_MIN_AGE,
  max_age: null,
  sort_order: seniorKyu.length + i + 1,
  requirements: requirementsMarkdown(`D-${i + 1}`),
}));

export const seedGrades: Grade[] = [...junior, ...seniorKyu, ...dan];
