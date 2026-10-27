import Image from "next/image";
import Link from "next/link";
import { HomeArt, type HomeArtKind } from "@/components/home-art";
import { KankuAnimation } from "@/components/kanku-animation";

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
    photo: "/klub/ring.jpg",
    title: "Dragon Fight Club Radom",
    subtitle: "Kadra, Akademia 50+, zdjęcia sali i kontakt.",
    meta: "Klub",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-input p-8">
        <div className="pointer-events-none absolute -right-16 top-1/2 h-72 w-72 -translate-y-1/2 opacity-25 md:right-10 md:h-60 md:w-60 md:opacity-100">
          <KankuAnimation className="h-full w-full" />
        </div>
        <div className="relative">
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
  photo?: string;
};

// Kafelek z grafiką w jednym stylu: ciemne tło, czerwona poświata, jasna sylwetka albo zdjęcie klubu.
function HomeCard({ href, title, subtitle, meta, art, photo }: HomeCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent hover:bg-card-hover"
    >
      <div className="relative aspect-[2/1] overflow-hidden border-b border-border bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%),linear-gradient(to_bottom,var(--input),var(--card))]">
        {photo ? (
          <>
            <Image
              src={photo}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
          </>
        ) : (
          art && (
            <div className="absolute inset-0 p-3 transition-transform duration-500 group-hover:scale-105">
              <HomeArt kind={art} />
            </div>
          )
        )}
      </div>
      <div className="p-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent-text">{meta}</p>
        <h3 className="font-semibold group-hover:text-accent-text">{title}</h3>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}
