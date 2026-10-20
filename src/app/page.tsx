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
      <section className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 p-8 text-stone-50">
        <p className="text-4xl font-bold text-[#ef3340]">押忍</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Trenuj Kyokushin w dojo i w domu
        </h1>
        <p className="mt-3 max-w-xl text-stone-300">
          Techniki wideo w zwolnionym tempie, programy treningowe i wiedza, która przyda się na
          każdym egzaminie.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/techniki"
            className="rounded-lg bg-[#c8102e] px-5 py-2.5 font-semibold text-white hover:bg-[#a50d26]"
          >
            Zacznij trening
          </Link>
          <Link
            href="/wiedza"
            className="rounded-lg border border-stone-600 px-5 py-2.5 font-semibold hover:border-stone-300"
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
