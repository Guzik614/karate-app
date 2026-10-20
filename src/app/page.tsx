import Link from "next/link";
import { CardLink } from "@/components/card-link";

const SECTIONS = [
  {
    href: "/techniki?kategoria=kihon",
    title: "Kihon",
    subtitle: "Ciosy, bloki, kopnięcia i pozycje krok po kroku.",
    meta: "Wideo",
  },
  {
    href: "/techniki?kategoria=kata",
    title: "Kata",
    subtitle: "Formy od Taikyoku po kata na wyższe stopnie.",
    meta: "Wideo",
  },
  {
    href: "/techniki?kategoria=kihon_kumite",
    title: "Kihon kumite",
    subtitle: "Ustalone ćwiczenia z partnerem.",
    meta: "Wideo",
  },
  {
    href: "/programy",
    title: "Programy treningowe",
    subtitle: "Gotowe plany na kolejne tygodnie i stopnie.",
    meta: "Trening",
  },
  {
    href: "/wiedza",
    title: "Teoria i Wiedza",
    subtitle: "Historia, Dojo Kun, etykieta i artykuły.",
    meta: "Edukacja",
  },
  {
    href: "/wiedza/slowniczek",
    title: "Słowniczek",
    subtitle: "Japońskie komendy, techniki i pozycje.",
    meta: "Edukacja",
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card to-input p-8">
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
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <CardLink key={s.href} {...s} />
        ))}
      </section>
    </div>
  );
}
