import Image from "next/image";
import { HeroScene } from "@/components/hero-scene";

// Wideo tła strony głównej (dojo, karateka w seiza tyłem, powolny zoom, bez dźwięku) i jego pierwsza klatka.
// Odtwarza się raz i zatrzymuje na ostatniej klatce. Bez pliku pokazujemy ilustrowaną scenę z górami.
const HERO_VIDEO: { sources: { src: string; type: string }[]; poster: string } | null = {
  sources: [
    { src: "/grafika/hero-dojo.webm", type: "video/webm" },
    { src: "/grafika/hero-dojo.mp4", type: "video/mp4" },
  ],
  poster: "/grafika/hero-dojo.jpg",
};

export function HeroVideo() {
  if (!HERO_VIDEO) return <HeroScene />;
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-[50%_30%] md:w-[65%] md:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
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
      {/* Na komputerze wideo zajmuje prawą część, żeby karateka nie chował się za tekstem. */}
      {/* Kaligraficzny znak Kyokushin przy prawej krawędzi; na telefonie przygaszony, żeby nie zasłaniał tekstu */}
      <div className="absolute inset-0 opacity-30 md:opacity-100">
        <Image
          src="/grafika/kyokushin-kanji.png"
          alt=""
          width={339}
          height={933}
          priority
          className="hero-kanji absolute top-[6%] right-[4%] h-[82%] w-auto md:top-[14%] md:right-[2%] md:h-[72%]"
        />
      </div>
    </div>
  );
}
