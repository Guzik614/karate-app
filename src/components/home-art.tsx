// Minimalistyczne grafiki strony głównej: jasne sylwetki karateków (linia + pas w kolorze akcentu)
// na ciemnym tle. Wszystkie w tym samym stylu i w siatce 320 × 160.

type Point = [number, number];
const line = (points: Point[]) => points.map((p) => p.join(",")).join(" ");

const LIMB = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type Pose = {
  head: Point;
  torso: Point[];
  legs: Point[][];
  arms: Point[][];
  belt: Point; // środek pasa
  strike?: Point[]; // ręka/noga, która „uderza” po najechaniu
};

function Figure({ pose }: { pose: Pose }) {
  const [bx, by] = pose.belt;
  return (
    <g>
      {pose.legs.map((l, i) => (
        <polyline key={`l${i}`} points={line(l)} {...LIMB} />
      ))}
      <polyline points={line(pose.torso)} {...LIMB} strokeWidth={13} />
      {pose.arms.map((a, i) => (
        <polyline key={`a${i}`} points={line(a)} {...LIMB} />
      ))}
      {pose.strike && <polyline className="art-strike" points={line(pose.strike)} {...LIMB} />}
      <circle cx={pose.head[0]} cy={pose.head[1]} r={10} fill="currentColor" />
      <g stroke="var(--accent)" strokeWidth={5} strokeLinecap="round">
        <line x1={bx - 9} y1={by} x2={bx + 9} y2={by} />
        <line x1={bx - 2} y1={by} x2={bx - 8} y2={by + 13} />
        <line x1={bx + 1} y1={by} x2={bx + 4} y2={by + 14} />
      </g>
    </g>
  );
}

// Zenkutsu-dachi z oi-tsuki, patrzy w prawo.
const punch: Pose = {
  head: [154, 44],
  torso: [
    [151, 93],
    [153, 60],
  ],
  legs: [
    [
      [151, 95],
      [184, 113],
      [190, 140],
    ],
    [
      [151, 95],
      [96, 140],
    ],
  ],
  arms: [
    [
      [153, 63],
      [131, 76],
      [140, 90],
    ],
  ],
  strike: [
    [153, 63],
    [214, 63],
  ],
  belt: [151, 88],
};

// Kiba-dachi z gedan-barai, przodem.
const kiba: Pose = {
  head: [160, 42],
  torso: [
    [160, 94],
    [160, 58],
  ],
  legs: [
    [
      [160, 96],
      [128, 110],
      [124, 140],
    ],
    [
      [160, 96],
      [192, 110],
      [196, 140],
    ],
  ],
  arms: [
    [
      [162, 62],
      [184, 77],
      [174, 90],
    ],
  ],
  strike: [
    [158, 62],
    [134, 82],
    [118, 104],
  ],
  belt: [160, 89],
};

// Jodan-uke (obrońca): patrzy w lewo, przedramię nad głową.
const block: Pose = {
  head: [214, 46],
  torso: [
    [215, 95],
    [214, 62],
  ],
  legs: [
    [
      [215, 97],
      [196, 116],
      [192, 140],
    ],
    [
      [215, 97],
      [250, 140],
    ],
  ],
  arms: [
    [
      [214, 64],
      [232, 78],
      [224, 91],
    ],
  ],
  strike: [
    [214, 64],
    [196, 46],
    [188, 28],
  ],
  belt: [215, 90],
};

// Atakujący w kihon kumite: ten sam cios, przesunięty w lewo.
const attack: Pose = {
  head: [104, 46],
  torso: [
    [101, 95],
    [103, 62],
  ],
  legs: [
    [
      [101, 97],
      [132, 115],
      [138, 140],
    ],
    [
      [101, 97],
      [48, 140],
    ],
  ],
  arms: [
    [
      [103, 65],
      [82, 78],
      [90, 92],
    ],
  ],
  strike: [
    [103, 65],
    [176, 48],
  ],
  belt: [101, 90],
};

function Ground() {
  return <line x1={30} y1={146} x2={290} y2={146} stroke="var(--border)" strokeWidth={2} />;
}

// Embusen (linia kata w kształcie litery H).
function Embusen() {
  return (
    <path
      d="M70 30 V130 M250 30 V130 M70 80 H250"
      fill="none"
      stroke="var(--accent)"
      strokeWidth={2}
      strokeDasharray="6 8"
      opacity={0.45}
    />
  );
}

function Calendar() {
  const days = Array.from({ length: 14 }, (_, i) => i);
  return (
    <g>
      <rect x={84} y={22} width={152} height={122} rx={10} fill="none" stroke="currentColor" strokeWidth={5} />
      <line x1={84} y1={48} x2={236} y2={48} stroke="var(--accent)" strokeWidth={5} />
      {days.map((d) => {
        const x = 102 + (d % 7) * 19;
        const y = 70 + Math.floor(d / 7) * 34;
        return d < 9 ? (
          <polyline
            key={d}
            points={`${x - 5},${y} ${x - 1},${y + 5} ${x + 7},${y - 6}`}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={3.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <circle key={d} cx={x} cy={y} r={3} fill="currentColor" opacity={0.45} />
        );
      })}
    </g>
  );
}

function Kanji({ text, sub }: { text: string; sub: string }) {
  return (
    <g>
      <text x={160} y={98} textAnchor="middle" fontSize={64} fontWeight={700} fill="currentColor">
        {text}
      </text>
      <line x1={110} y1={116} x2={210} y2={116} stroke="var(--accent)" strokeWidth={4} strokeLinecap="round" />
      <text x={160} y={140} textAnchor="middle" fontSize={15} letterSpacing={4} fill="var(--muted)">
        {sub}
      </text>
    </g>
  );
}

function Scroll() {
  return (
    <g>
      <rect x={96} y={30} width={128} height={104} rx={4} fill="none" stroke="currentColor" strokeWidth={5} />
      <line x1={88} y1={30} x2={232} y2={30} stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" />
      <line x1={88} y1={134} x2={232} y2={134} stroke="var(--accent)" strokeWidth={8} strokeLinecap="round" />
      <text x={160} y={102} textAnchor="middle" fontSize={44} fontWeight={700} fill="currentColor">
        押忍
      </text>
    </g>
  );
}

export type HomeArtKind = "kihon" | "kata" | "kumite" | "programy" | "wiedza" | "slowniczek";

export function HomeArt({ kind }: { kind: HomeArtKind }) {
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full text-foreground" aria-hidden>
      {kind === "kihon" && (
        <>
          <Ground />
          <Figure pose={punch} />
        </>
      )}
      {kind === "kata" && (
        <>
          <Embusen />
          <Ground />
          <Figure pose={kiba} />
        </>
      )}
      {kind === "kumite" && (
        <>
          <Ground />
          <Figure pose={attack} />
          <Figure pose={block} />
        </>
      )}
      {kind === "programy" && <Calendar />}
      {kind === "wiedza" && <Scroll />}
      {kind === "slowniczek" && <Kanji text="空手" sub="KARATE · PUSTA RĘKA" />}
    </svg>
  );
}
