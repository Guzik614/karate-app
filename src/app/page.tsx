import Image from "next/image";
import Link from "next/link";
import { HomeArt, type HomeArtKind } from "@/components/home-art";
import { HeroVideo } from "@/components/hero-video";

const SECTIONS = [
  {
    href: "/techniki?kategoria=kihon",
    art: "kihon" as HomeArtKind,
    title: "Kihon",
    subtitle: "Ciosy, bloki, kopnięcia i pozycje krok po kroku.",
    meta: "Wideo",
  },
  {
    href: "/techniki?kategoria=kata",
    art: "kata" as HomeArtKind,
    title: "Kata",
    subtitle: "Formy od Taikyoku po kata na wyższe stopnie.",
    meta: "Wideo",
  },
  {
    href: "/techniki?kategoria=kihon_kumite",
    art: "kumite" as HomeArtKind,
    title: "Kihon kumite",
    subtitle: "Ustalone ćwiczenia z partnerem.",
    meta: "Wideo",
  },
  {
    href: "/programy",
    art: "programy" as HomeArtKind,
    title: "Programy treningowe",
    subtitle: "Gotowe plany na kolejne tygodnie i stopnie.",
    meta: "Trening",
  },
  {
    href: "/wiedza",
    art: "wiedza" as HomeArtKind,
    title: "Teoria i Wiedza",
    subtitle: "Historia, Dojo Kun, etykieta i artykuły.",
    meta: "Edukacja",
  },
  {
    href: "/wiedza/slowniczek",
    art: "slowniczek" as HomeArtKind,
    title: "Słowniczek",
    subtitle: "Japońskie komendy, techniki i pozycje.",
    meta: "Edukacja",
  },
  {
    href: "/klub",
    logo: "/klub/logo-dfc.png",
    title: "Dragon Fight Club Radom",
    subtitle: "Kadra, Akademia 50+, zdjęcia sali i kontakt.",
    meta: "Klub",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-border bg-background p-8 md:min-h-[24rem]">
        <HeroVideo />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent md:via-background/35" />
        <div className="relative max-w-xl">
        <p className="text-4xl font-bold text-accent-text">押忍</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Trenuj Kyokushin w dojo i w domu
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Techniki wideo w zwolnionym tempie, programy treningowe i wiedza, która przyda się na
          każdym egzaminie.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/techniki"
            className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-hover"
          >
            Zacznij trening
          </Link>
          <Link
            href="/wiedza"
            className="rounded-lg border border-border px-5 py-2.5 font-semibold hover:border-accent hover:text-accent-text"
          >
            Teoria i Wiedza
          </Link>
          <a
            href="#intro"
            className="rounded-lg border border-border px-5 py-2.5 font-semibold hover:border-accent hover:text-accent-text"
          >
            ▶ Sprawdź, zanim zaczniesz
          </a>
        </div>
        </div>
      </section>

      <IntroVideo />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <HomeCard key={s.href} {...s} />
        ))}
      </section>
    </div>
  );
}

// Rolki klubu Dragon Fight Club Radom jako intro dla nowych osób. Pionowe, z dźwiękiem, startują po kliknięciu.
const INTRO_REELS = [
  { src: "/wideo/pokolenia-1.mp4", poster: "/wideo/pokolenia-1.jpg?v=4", label: "Część 1 · Przygotowanie" },
  { src: "/wideo/pokolenia-2.mp4", poster: "/wideo/pokolenia-2.jpg?v=2", label: "Część 2 · Pokolenia" },
];

function IntroVideo() {
  return (
    <section
      id="intro"
      className="grid scroll-mt-20 items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card p-5 md:grid-cols-[minmax(0,28rem)_1fr] md:p-8"
    >
      <div className="grid grid-cols-2 gap-3">
        {INTRO_REELS.map((reel) => (
          <figure key={reel.src}>
            <video
              className="aspect-[9/16] w-full rounded-xl border border-border bg-background object-cover"
              src={reel.src}
              poster={reel.poster}
              controls
              playsInline
              preload="none"
            />
            <figcaption className="mt-2 text-center text-xs text-muted">{reel.label}</figcaption>
          </figure>
        ))}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-accent-text">Intro · 2 krótkie filmy</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Sprawdź, zanim zaczniesz</h2>
        <p className="mt-3 max-w-lg text-muted">
          Zawiązanie pasa, rozgrzewka, pozycja walki, a potem pokolenia na jednej macie. Zobacz, jak wygląda
          trening Kyokushin w Dragon Fight Club Radom, zanim przejdziesz do technik i programów.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/techniki"
            className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:bg-accent-hover"
          >
            Zacznij trening
          </Link>
          <Link
            href="/klub"
            className="rounded-lg border border-border px-5 py-2.5 font-semibold hover:border-accent hover:text-accent-text"
          >
            O klubie
          </Link>
        </div>
      </div>
    </section>
  );
}

type HomeCardProps = {
  href: string;
  title: string;
  subtitle: string;
  meta: string;
  art?: HomeArtKind;
  logo?: string;
};

// Kafelek z grafiką w jednym stylu: ciemne tło z czerwoną poświatą i jasna grafika (sylwetka albo logo klubu).
function HomeCard({ href, title, subtitle, meta, art, logo }: HomeCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent hover:bg-card-hover"
    >
      <div className="relative aspect-[2/1] overflow-hidden border-b border-border bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%),linear-gradient(to_bottom,var(--input),var(--card))]">
        <div className="absolute inset-0 p-3 transition-transform duration-500 group-hover:scale-105">
          {art && <HomeArt kind={art} />}
          {logo && <Image src={logo} alt="" fill sizes="320px" className="object-contain p-5" />}
        </div>
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent-text">{meta}</p>
        <h3 className="font-semibold group-hover:text-accent-text">{title}</h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}
