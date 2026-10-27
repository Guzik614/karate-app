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
        </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <HomeCard key={s.href} {...s} />
        ))}
      </section>
    </div>
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
