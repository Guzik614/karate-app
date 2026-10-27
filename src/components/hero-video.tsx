import { HeroScene } from "@/components/hero-scene";

// Plik wideo tła strony głównej (krótka pętla bez dźwięku) i jego pierwsza klatka.
// Dopóki pliku nie ma w public/, pokazujemy ilustrowaną scenę z górami.
const HERO_VIDEO: { src: string; poster: string } | null = null;

export function HeroVideo() {
  if (!HERO_VIDEO) return <HeroScene />;
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      src={HERO_VIDEO.src}
      poster={HERO_VIDEO.poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
    />
  );
}
