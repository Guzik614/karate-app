import { BELT_COLOR_LABELS, type BeltColor, type Grade } from "@/lib/types";

const FILL: Record<BeltColor, string> = {
  white: "#f1f1ee",
  orange: "#f08a24",
  blue: "#2563eb",
  yellow: "#f2cf1d",
  green: "#1f9d55",
  brown: "#7b4a22",
  black: "#0b0b0d",
  gold: "#d4af37",
};

const RED = "#d01f32";

// Przymiotnik w rodzaju żeńskim do opisu belki („niebieska belka”).
const STRIPE_LABELS: Record<BeltColor, string> = {
  white: "biała",
  orange: "pomarańczowa",
  blue: "niebieska",
  yellow: "żółta",
  green: "zielona",
  brown: "brązowa",
  black: "czarna",
  gold: "złota",
};

// Rysunek końcówki pasa: kolor pasa, kolorowa belka (kolor kolejnego pasa),
// czerwone belki podstopni juniora lub złote belki stopni dan.
export function Belt({ grade, className }: { grade: Pick<Grade, "belt_color" | "stripe_color" | "red_stripes" | "gold_stripes">; className?: string }) {
  const marks: { color: string; width: number }[] = [];
  if (grade.stripe_color) marks.push({ color: FILL[grade.stripe_color], width: 14 });
  for (let i = 0; i < grade.red_stripes; i++) marks.push({ color: RED, width: 7 });
  for (let i = 0; i < grade.gold_stripes; i++) marks.push({ color: FILL.gold, width: 6 });

  const gap = 4;
  let x = 196;
  const placed = marks.map((m) => {
    x -= m.width;
    const at = x;
    x -= gap;
    return { ...m, x: at };
  });

  return (
    <svg viewBox="0 0 210 28" className={className} role="img" aria-label={beltDescription(grade)}>
      <rect x="0.5" y="0.5" width="209" height="27" rx="4" fill={FILL[grade.belt_color]} stroke="rgba(255,255,255,0.18)" />
      {placed.map((m, i) => (
        <rect key={i} x={m.x} y="0.5" width={m.width} height="27" fill={m.color} />
      ))}
    </svg>
  );
}

export function beltDescription(grade: Pick<Grade, "belt_color" | "stripe_color" | "red_stripes" | "gold_stripes">) {
  const parts = [`pas ${BELT_COLOR_LABELS[grade.belt_color]}`];
  if (grade.stripe_color) parts.push(`${STRIPE_LABELS[grade.stripe_color]} belka`);
  if (grade.red_stripes) parts.push(stripes(grade.red_stripes, "czerwona belka", "czerwone belki", "czerwonych belek"));
  if (grade.gold_stripes) parts.push(stripes(grade.gold_stripes, "złota belka", "złote belki", "złotych belek"));
  return parts.join(" + ");
}

// Polska odmiana liczebnika: 1 belka, 2–4 belki, 5+ belek (ale 22–24 belki).
function stripes(n: number, one: string, few: string, many: string) {
  if (n === 1) return `1 ${one}`;
  const isFew = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14);
  return `${n} ${isFew ? few : many}`;
}
