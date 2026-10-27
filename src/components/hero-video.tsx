import Image from "next/image";
import { HeroScene } from "@/components/hero-scene";

// Wideo tła strony głównej (wschód słońca nad górami, bez dźwięku) i jego pierwsza klatka.
// Odtwarza się raz i zatrzymuje na ostatniej klatce. Bez pliku pokazujemy ilustrowaną scenę z górami.
const HERO_VIDEO: { sources: { src: string; type: string }[]; poster: string } | null = {
  sources: [
    { src: "/grafika/hero-gory.webm", type: "video/webm" },
    { src: "/grafika/hero-gory.mp4", type: "video/mp4" },
  ],
  poster: "/grafika/hero-gory.jpg",
};

export function HeroVideo() {
  if (!HERO_VIDEO) return <HeroScene />;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="h-full w-full object-cover object-[70%_20%]"
        poster={HERO_VIDEO.poster}
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        {HERO_VIDEO.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      {/* Kaligraficzny znak Kyokushin na tle gór; na telefonie przygaszony, żeby nie zasłaniał tekstu */}
      <div className="absolute inset-0 opacity-30 md:opacity-100">
        <Image
          src="/grafika/kyokushin-kanji.png"
          alt=""
          width={339}
          height={933}
          priority
          className="hero-kanji absolute top-[6%] right-[4%] h-[82%] w-auto md:right-[14%]"
        />
      </div>
    </div>
  );
}
