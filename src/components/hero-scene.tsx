// Tło głównego prostokąta: zachodzące słońce, góry we mgle i kaligraficzny znak Kyokushin,
// który wyłania się zza grzbietów. Animacje wyłącza prefers-reduced-motion (globals.css).
export function HeroScene() {
  return (
    <svg
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMaxYMax slice"
      className="hero-scene absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10141b" />
          <stop offset="70%" stopColor="#1d1418" />
          <stop offset="100%" stopColor="#2a1418" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff5a64" />
          <stop offset="60%" stopColor="#d01f32" />
          <stop offset="100%" stopColor="#d01f32" stopOpacity={0} />
        </radialGradient>
        <radialGradient id="hero-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d01f32" stopOpacity={0.45} />
          <stop offset="100%" stopColor="#d01f32" stopOpacity={0} />
        </radialGradient>
        <filter id="hero-blur" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      <rect width="1200" height="420" fill="url(#hero-sky)" />

      {/* Słońce i poświata */}
      <circle className="hero-glow" cx="930" cy="250" r="260" fill="url(#hero-glow)" />
      <circle className="hero-sun" cx="930" cy="250" r="125" fill="url(#hero-sun)" />


      {/* Dalekie góry */}
      <path
        d="M380 420 L470 300 L520 330 L610 230 L690 300 L760 250 L840 320 L930 215 L1020 290 L1090 245 L1200 310 L1200 420 Z"
        fill="#262c38"
      />
      <ellipse className="hero-mist-1" cx="820" cy="318" rx="360" ry="16" fill="#e7eaf0" opacity={0.08} filter="url(#hero-blur)" />

      {/* Kaligraficzny znak Kyokushin wyłania się zza gór */}
      <image
        className="hero-kanji"
        href="/grafika/kyokushin-kanji.png"
        x="876"
        y="8"
        width="109"
        height="300"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Środkowe góry */}
      <path
        d="M300 420 L420 330 L490 360 L590 290 L670 345 L780 300 L860 350 L960 285 L1060 345 L1140 315 L1200 340 L1200 420 Z"
        fill="#1b2029"
      />
      <ellipse className="hero-mist-2" cx="760" cy="368" rx="420" ry="14" fill="#e7eaf0" opacity={0.07} filter="url(#hero-blur)" />

      {/* Bliskie grzbiety */}
      <path
        d="M0 420 L0 390 L160 370 L320 395 L470 360 L620 392 L760 368 L900 395 L1040 372 L1200 392 L1200 420 Z"
        fill="#12161d"
      />
    </svg>
  );
}
